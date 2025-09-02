import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import { Country } from "react-phone-number-input";

// Local imports
import { getCountryName } from "@/utils/common";
import { countryData } from "@/utils/countries";
import { analytics } from "@/utils/analytics";
import { leadService, cmsLeadService } from "src/services";
import useGeoLocation from "./useGeoLocation";
import CountryDropdown from "./CountryDropdown";
import Styles from "./requestForm.module.css";
import useIsMobile from "@/hooks/useIsMobile";

// Dynamic imports for better performance
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

const CountriesList = dynamic(() => import("../countriesList/countriesList"), {
  ssr: false,
});

// TypeScript interfaces for better type safety
interface RequestFormProps {
  title?: string;
  buttonName?: string;
  type?: string;
  onFormSubmit: () => void;
  isWhatsapp?: boolean;
  onPopupClose?: (shouldSubmit: boolean) => void;
  isPopupForm?: boolean;
  programofinterest?: string;
  BrochureUrl?: string;
  form_control?: FormControl;
  mobileLPpopup?: boolean;
}

interface FormControl {
  id: number;
  form_api_service: {
    id: number;
    save_vin_crm: boolean;
  };
  form_field_enable: {
    id: number;
    company_name: boolean;
    designation: boolean;
    country: boolean;
    years_in_operation: boolean;
    number_of_employees: boolean;
    annual_revenue: boolean;
    referrer_name: boolean;
    sector_field: boolean;
  };
}

interface GeoLocationData {
  country?: string;
  city?: string;
  countryCode?: string;
  countryCallingCode?: string;
}

interface FormErrors {
  Name?: { message: string };
  Email?: { message: string };
  Phone?: { message: string };
  Programme_Of_Interest?: { message: string };
  CompanyName?: { message: string };
  Designation?: { message: string };
  Country?: { message: string };
  YearsInOperation?: { message: string };
  NumberOfEmployees?: { message: string };
  AnnualRevenue?: { message: string };
  IntroducedBy?: { message: string };
  SectorField?: { message: string };
}

interface FormData extends FieldValues {
  Name: string;
  Email: string;
  Phone: string;
  Programme_Of_Interest: string;
  CompanyName?: string;
  Designation?: string;
  Country?: string;
  YearsInOperation?: string;
  NumberOfEmployees?: string;
  AnnualRevenue?: string;
  IntroducedBy?: string;
  SectorField?: string;
}

// Constants
const THANK_YOU_DISPLAY_TIME = 5000; // 5 seconds
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=27733502575&text=Hi%20there";

/**
 * Validates phone number format and length
 * @param phone - Phone number to validate
 * @param mobileLength - Expected mobile length
 * @returns Validation result
 */
const validatePhoneNumber = (phone: string, mobileLength: number): true | string => {
  if (!phone || !phone.startsWith("+")) {
    return "Invalid phone number format";
  }

  const sortedCountryData = countryData.sort(
    (a, b) => b.countryCode.length - a.countryCode.length
  );

  const extractedCountry = sortedCountryData.find((c) =>
    phone.startsWith(c.countryCode)
  );

  if (!extractedCountry) {
    return "Country not found for the given code";
  }

  const phoneNumber = phone.replace(extractedCountry.countryCode, "").trim();
  return phoneNumber.length === extractedCountry.mobileLength
    ? true
    : `Phone number should be ${extractedCountry.mobileLength} digits long`;
};

/**
 * Thank You Message Component
 */
const ThankYouMessage: React.FC = () => (
  <div className={Styles.RequestFormStyle}>
    <div className={Styles.FormCard}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>
          <Image
            src="/assets/images/allImages/animation.gif"
            alt="Submission Animation"
            title="Submission Animation"
            className={Styles.animationGif}
            width={80}
            height={80}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            color: '#2b3340', 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '10px',
            fontFamily: 'Montserrat-Bold'
          }}>
            Your Future Awaits!
          </h3>
          <p style={{ 
            color: '#555963', 
            fontSize: '14px', 
            lineHeight: '20px',
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            Enrol Now and Begin Your Journey!
          </p>
          <p style={{ 
            color: '#555963', 
            fontSize: '14px', 
            lineHeight: '20px',
            marginBottom: '15px'
          }}>
            Thank you for registering! Our counsellor will get in touch with you shortly to guide you through the next steps.
          </p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Request Form Component
 */
const RequestFormLP = forwardRef<any, RequestFormProps>(
  (
    {
      title = "Request a call",
      buttonName = "Submit",
      type,
      onFormSubmit,
      isWhatsapp,
      onPopupClose,
      isPopupForm,
      programofinterest,
      BrochureUrl,
      form_control,
      mobileLPpopup
    },
    ref
  ) => {
    const router = useRouter();
    const [btnDisable, setBtnDisable] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const [showThankYou, setShowThankYou] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    
    // Progressive validation state
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
    const [currentErrorField, setCurrentErrorField] = useState<string | null>(null);
    const [showAllRequiredError, setShowAllRequiredError] = useState(false);
    const [correctedFields, setCorrectedFields] = useState<Set<string>>(new Set());

    const geoLocationData = useGeoLocation() as GeoLocationData;
    const isMobile = useIsMobile();
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      referralCode,
      source,
      email,
      mobile,
      program_of_interest,
    } = router.query;

    const {
      formState: { errors },
      reset,
      trigger,
      watch,
      setValue,
      register,
      handleSubmit,
      getValues,
      clearErrors,
    } = useForm<FormData>({
      mode: "onChange", // Enable onChange validation for progressive flow
    });

    const formErrors = errors as FormErrors;

    // Define field order for progressive validation
    const fieldOrder = useMemo(() => {
      const baseFields = ["Name", "Email", "Phone"];
      const additionalFields = [];
      
      if (form_control?.form_field_enable?.company_name) {
        additionalFields.push("CompanyName");
      }
      if (form_control?.form_field_enable?.designation) {
        additionalFields.push("Designation");
      }
      if (form_control?.form_field_enable?.country) {
        additionalFields.push("Country");
      }
      if (form_control?.form_field_enable?.years_in_operation) {
        additionalFields.push("YearsInOperation");
      }
      if (form_control?.form_field_enable?.number_of_employees) {
        additionalFields.push("NumberOfEmployees");
      }
      if (form_control?.form_field_enable?.annual_revenue) {
        additionalFields.push("AnnualRevenue");
      }
      if (form_control?.form_field_enable?.sector_field) {
        additionalFields.push("SectorField");
      }
      if (form_control?.form_field_enable?.referrer_name) {
        additionalFields.push("IntroducedBy");
      }
      
      return [...baseFields, ...additionalFields];
    }, [form_control]);

    // Check if referral data exists
    const hasReferralData = useMemo(() => {
      return !!(email && mobile);
    }, [email, mobile]);

    // Set initial form values from URL parameters
    useEffect(() => {
      if (!router.isReady) return;

      if (email) {
        setValue("Email", decodeURIComponent(email.toString()));
      }

      if (mobile) {
        setValue("Phone", decodeURIComponent(mobile.toString()));
      }

      // Set program of interest from props or query params
      const programToSet = programofinterest || program_of_interest;
      if (programToSet) {
        const decodedProgram = decodeURIComponent(programToSet.toString());
        setValue("Programme_Of_Interest", decodedProgram);
      }
    }, [router.isReady, email, mobile, program_of_interest, programofinterest, setValue]);

    // Set country from geolocation
    useEffect(() => {
      if (geoLocationData?.country && !watch("Country")) {
        const countryCode = geoLocationData.country.toUpperCase();
        if (countryCode.length === 2) {
          setSelectedCountry(countryCode as Country);
          // Also set the country name in the form if not already set
          const countryName = getCountryName(countryCode);
          if (countryName) {
            setValue("Country", countryName);
          }
        }
      }
    }, [geoLocationData?.country, setValue, watch]);

    // Form validation rules
    const validationRules = useMemo(
      () => ({
        Name: {
          required: "*Full Name is Required",
          pattern: {
            value: /^[a-zA-Z_ ]+$/,
            message: "Invalid User Name",
          },
        },
        Email: {
          required: "*Email is Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        },
        Phone: {
          required: "*Phone number is required",
          validate: (value: string) =>
            validatePhoneNumber(value, countryData[0].mobileLength),
        },
        Programme_Of_Interest: {
          required: "Course is required for Programme of Interest",
        },
        CompanyName: {
          required: form_control?.form_field_enable?.company_name ? "*Company Name is required" : false,
          maxLength: {
            value: 150,
            message: "Company name must be less than 150 characters for Company Name",
          },
          pattern: {
            value: /^[a-zA-Z0-9&.\-\s]+$/,
            message: "Only alphanumeric characters, &, -, . and spaces allowed for Company Name",
          },
        },
        Designation: {
          required: form_control?.form_field_enable?.designation ? "*Designation is required" : false,
          maxLength: {
            value: 100,
            message: "Designation must be less than 100 characters for Designation",
          },
          pattern: {
            value: /^[a-zA-Z\s\-]+$/,
            message: "Only alphabets, spaces and - allowed for Designation",
          },
        },
        Country: {
          required: form_control?.form_field_enable?.country ? "*Country is required" : false,
        },
        YearsInOperation: {
          required: form_control?.form_field_enable?.years_in_operation ? "*Years in Operation is required" : false,
          pattern: {
            value: /^\d+$/,
            message: "Years in Operation must contain only numbers (0-100)",
          },
          validate: (value: string | undefined) => {
            if (!value) return true; // Let required validation handle empty values
            const numValue = parseInt(value);
            if (isNaN(numValue)) return "Years in Operation must be a valid number";
            if (numValue < 0 || numValue > 100) return "Years in Operation must be between 0 and 100";
            return true;
          },
        },
        NumberOfEmployees: {
          required: form_control?.form_field_enable?.number_of_employees ? "*Number of Employees is required" : false,
          pattern: {
            value: /^\d+$/,
            message: "Number of Employees must contain only numbers",
          },
          validate: (value: string | undefined) => {
            if (!value) return true; // Let required validation handle empty values
            const numValue = parseInt(value);
            if (isNaN(numValue)) return "Number of Employees must be a valid number";
            if (numValue < 1 || numValue > 1000000) return "Number of Employees must be between 1 and 1,000,000";
            return true;
          },
        },
        AnnualRevenue: {
          required: form_control?.form_field_enable?.annual_revenue ? "*Annual Revenue is required" : false,
          pattern: {
            value: /^[\d,]+$/,
            message: "Annual Revenue must contain only numbers and commas",
          },
          validate: (value: string | undefined) => {
            if (!value) return true; // Let required validation handle empty values
            const cleanValue = value.replace(/,/g, '');
            if (!/^\d+$/.test(cleanValue)) return "Annual Revenue must be a valid number";
            return true;
          },
        },
        IntroducedBy: {
          required: form_control?.form_field_enable?.referrer_name ? "*Referrer Name is required" : false,
          maxLength: {
            value: 100,
            message: "Referrer Name must be less than 100 characters",
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Referrer Name can only contain letters and spaces",
          },
          validate: (value: string | undefined) => {
            if (!value) return true; // Let required validation handle empty values
            if (/[0-9]/.test(value)) return "Referrer Name cannot contain numbers";
            if (!/^[a-zA-Z\s]+$/.test(value)) return "Referrer Name can only contain letters and spaces";
            return true;
          },
        },
        SectorField: {
          required: form_control?.form_field_enable?.sector_field ? "*Sector/Field is required" : false,
          maxLength: {
            value: 100,
            message: "Sector/Field must be less than 100 characters for Sector/Field",
          },
        },
      }),
      [form_control]
    );

    // Check if all required fields are empty
    const checkAllRequiredFieldsEmpty = () => {
      const values = getValues();
      const requiredFields = fieldOrder.filter(field => {
        const fieldName = field as keyof typeof validationRules;
        return validationRules[fieldName]?.required;
      });
      
      return requiredFields.every(field => {
        const value = values[field];
        return !value || value === "";
      });
    };

    // Find the first error field in order
    const findFirstErrorField = async () => {
      for (const field of fieldOrder) {
        const fieldName = field as keyof FormData;
        const isValid = await trigger(fieldName);
        if (!isValid) {
          return field;
        }
      }
      return null;
    };

    // Handle progressive validation on field change
    const handleProgressiveFieldChange = async (fieldName: string, value: any) => {
      // Update the field value
      setValue(fieldName as keyof FormData, value, { shouldValidate: false });
      
      if (!hasSubmittedOnce) return;
      
      // If this is the current error field, validate it
      if (currentErrorField === fieldName) {
        const isValid = await trigger(fieldName as keyof FormData);
        
        if (isValid) {
          // Field is now valid, mark it as corrected
          setCorrectedFields(prev => new Set([...prev, fieldName]));
          
          // Find the next error field
          const nextErrorField = await findFirstErrorField();
          setCurrentErrorField(nextErrorField);
          
          // Clear the "all required fields" error if it was showing
          if (showAllRequiredError && nextErrorField) {
            setShowAllRequiredError(false);
          }
        }
      } else if (correctedFields.has(fieldName)) {
        // Re-validate corrected fields to ensure they stay valid
        await trigger(fieldName as keyof FormData);
      }
    };

    // Handle form submission with progressive validation
    const handleFormSubmit: SubmitHandler<FormData> = async (data, e) => {
      if (!e) return;
      e.preventDefault();

      // First submission attempt
      if (!hasSubmittedOnce) {
        setHasSubmittedOnce(true);
        
        // Check if all required fields are empty
        if (checkAllRequiredFieldsEmpty()) {
          setShowAllRequiredError(true);
          setCurrentErrorField(null);
          return;
        }
        
        // Find the first error field
        const firstError = await findFirstErrorField();
        if (firstError) {
          setCurrentErrorField(firstError);
          setShowAllRequiredError(false);
          return;
        }
      }

      // If we still have errors, don't submit
      const isFormValid = await trigger();
      if (!isFormValid) {
        const firstError = await findFirstErrorField();
        setCurrentErrorField(firstError);
        return;
      }

      setBtnDisable(true);
      setSubmissionError(null); // Clear previous errors

      try {
        const current = new Date();
        const formData = {
          ...data,
          page_url: window.location.href,
          utm_parameters: window.location.href,
          utm_source: Array.isArray(utm_source) ? utm_source[0] : utm_source,
          utm_medium: Array.isArray(utm_medium) ? utm_medium[0] : utm_medium,
          utm_campaign: Array.isArray(utm_campaign) ? utm_campaign[0] : utm_campaign,
          utm_content: Array.isArray(utm_content) ? utm_content[0] : utm_content,
          date: `${current.getDate()}/${
            current.getMonth() + 1
          }/${current.getFullYear()}`,
          City: geoLocationData?.city,
          source: Array.isArray(source) ? source[0] || "DR Website" : source || "DR Website",
          country: selectedCountry
            ? getCountryName(selectedCountry.toString())
            : "",
          refer_code: Array.isArray(referralCode) ? referralCode[0] : referralCode?.toString(),
        };

        // Use the new service layer if form_control is provided, otherwise fallback to leadService
        let result;
        if (form_control) {
          // Filter form data based on enabled fields
          const filteredFormData = cmsLeadService.filterEnabledFields(formData, form_control.form_field_enable);
          result = await cmsLeadService.saveFormData(filteredFormData, form_control);
        } else {
          // Fallback to existing leadService
          result = await leadService.saveLead(formData);
        }

        if (result?.success) {
          // Handle WhatsApp redirect
          if (isWhatsapp) {
            router.push(WHATSAPP_URL);
          }

          // Track form submission
          analytics.trackFormSubmission("counselling", {
            submit_value: true,
          });

          onFormSubmit();
          setShowThankYou(true);
          
          // Open brochure URL in new tab if provided
          if (BrochureUrl) {
            window.open(BrochureUrl, '_blank');
          }

          // Close popup immediately if it's a popup form
          if (isPopupForm && onPopupClose) {
            onPopupClose(true);
          }

          // For regular forms, show thank you message for 5 seconds then reset form
          if (!isPopupForm) {
            setTimeout(() => {
              setShowThankYou(false);
              reset();
              setBtnDisable(false);
              // Reset validation state
              setHasSubmittedOnce(false);
              setCurrentErrorField(null);
              setShowAllRequiredError(false);
              setCorrectedFields(new Set());
            }, THANK_YOU_DISPLAY_TIME);
          } else {
            // For popup forms, reset immediately after success
            reset();
            setBtnDisable(false);
            // Reset validation state
            setHasSubmittedOnce(false);
            setCurrentErrorField(null);
            setShowAllRequiredError(false);
            setCorrectedFields(new Set());
          }
        } else {
          console.error("Form submission failed:", result?.error);
          setSubmissionError(result?.error || "Form submission failed. Please try again.");
          setBtnDisable(false);
        }
      } catch (error) {
        setBtnDisable(false);
        setSubmissionError("An unexpected error occurred. Please try again.");
        console.error("Form submission error:", error);
      }
    };

    // Handle input changes for analytics
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      trackingName: string
    ) => {
      handleProgressiveFieldChange(trackingName, e.target.value);
      analytics.trackInputChange(trackingName, {
        InputName: trackingName,
        Filled: e.target.value !== "",
        newValue: e.target.value,
      });
    };

    // Prevent auto-fill on input focus
    const preventAutoFill = (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.target;
      // Temporarily change the input type to prevent auto-fill
      const originalType = input.type;
      input.type = 'text';
      input.setAttribute('readonly', 'readonly');
      
      setTimeout(() => {
        input.type = originalType;
        input.removeAttribute('readonly');
        input.focus();
      }, 100);
    };

    // Prevent non-numeric input for number fields
    const preventNonNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow: backspace, delete, tab, escape, enter, arrow keys
      const allowedKeys = [8, 9, 27, 13, 46, 37, 38, 39, 40];
      
      // Allow: numbers 0-9
      const isNumber = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
      
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      const isCtrlKey = e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88);
      
      if (!allowedKeys.includes(e.keyCode) && !isNumber && !isCtrlKey) {
        e.preventDefault();
      }
    };

    // Prevent pasting non-numeric text in number fields
    const preventNonNumericPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData('text');
      const numericRegex = /^[0-9]+$/;
      
      if (!numericRegex.test(pastedText)) {
        e.preventDefault();
      }
    };

    // Count enabled fields to determine if scrolling is needed
    const enabledFieldsCount = useMemo(() => {
      if (!form_control?.form_field_enable) return 0;
      
      const { form_field_enable } = form_control;
      return Object.values(form_field_enable).filter(Boolean).length;
    }, [form_control]);

    const needsScrolling = enabledFieldsCount > 4;
    const shouldScroll = needsScrolling && !(mobileLPpopup && isMobile);

    // Determine which error to show
    const getErrorToShow = (fieldName: string): string | undefined => {
      if (!hasSubmittedOnce) return undefined;
      
      // Show "all required fields" error if applicable
      if (showAllRequiredError) return undefined;
      
      // Only show error for the current error field
      if (currentErrorField === fieldName) {
        const error = formErrors[fieldName as keyof FormErrors];
        return error?.message;
      }
      
      return undefined;
    };

    // Check if submit button should be disabled
    const isSubmitDisabled = useMemo(() => {
      if (btnDisable) return true;
      
      // After first submission, disable if there are still errors
      if (hasSubmittedOnce && (currentErrorField || showAllRequiredError)) {
        return true;
      }
      
      return false;
    }, [btnDisable, hasSubmittedOnce, currentErrorField, showAllRequiredError]);

    useImperativeHandle(ref, () => ({
      onPopupClose,
      formData: null,
    }));

    if (showThankYou) {
      return <ThankYouMessage />;
    }

    return (
      <div className={Styles.RequestFormStyle}>
        <form
          className={Styles.formContainer}
          onSubmit={handleSubmit(handleFormSubmit)}
          autoComplete="new-password"
          onBlur={() => {
            analytics.trackFormInteraction("partial_submitted");
          }}
        >
          <div
            className={Styles.FormCard}
            style={{
              maxWidth: isMobile && mobileLPpopup ? "100%" : undefined,
              overflowY: isMobile && mobileLPpopup ? "visible" : undefined,
            }}
          >
            <strong
              className={
                type === "contact" ? Styles.TitleContact : Styles.Title
              }
            >
              {title || "Request a call"}
            </strong>

            <div className={shouldScroll ? Styles.scrollableFormContainer : ''}>
              <div
                className={
                  type === "contact"
                    ? Styles.ContectForm
                    : Styles.formContentInput
                }
              >
                <div className={Styles.formContent}>
                  {/* Name Field */}
                  <div className={Styles.inputLabelContainer}>
                    <input
                      className={`${getErrorToShow("Name") ? "invalid" : ""} ${
                        Styles.inputForm
                      }`}
                      placeholder="Full Name*"
                      autoComplete="new-password"
                      {...register("Name", validationRules.Name)}
                      onFocus={preventAutoFill}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, "Name")
                      }
                    />
                  </div>

                  {/* Email Field */}
                  <div className={Styles.inputLabelContainer}>
                    <input
                      className={`${getErrorToShow("Email") ? "invalid" : ""} ${
                        Styles.inputForm
                      }`}
                      placeholder="Email*"
                      autoComplete="new-password"
                      {...register("Email", validationRules.Email)}
                      disabled={hasReferralData}
                      onFocus={preventAutoFill}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, "Email")
                      }
                      style={{
                        backgroundColor: hasReferralData
                          ? "#f5f5f5"
                          : "white",
                        color: hasReferralData ? "#333" : "black",
                        cursor: hasReferralData ? "not-allowed" : "text",
                      }}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className={Styles.inputLabelContainer}>
                    <PhoneInput
                      international
                      defaultCountry={geoLocationData?.country as Country}
                      countryCallingCodeEditable={false}
                      countrySelectComponent={CountriesList}
                      placeholder="Select Country Code*"
                      value={watch("Phone")}
                      autoComplete="new-password"
                      {...register("Phone", validationRules.Phone)}
                      disabled={hasReferralData}
                      onFocus={preventAutoFill}
                      onChange={(value) => {
                        if (!hasReferralData) {
                          const phoneNumber = value?.toString() || "";
                          handleProgressiveFieldChange("Phone", phoneNumber);
                          analytics.trackInputChange("Phone", {
                            InputName: "Phone",
                            Filled: phoneNumber !== "",
                            newValue: phoneNumber,
                          });
                        }
                      }}
                      onCountryChange={(country: Country | undefined) => {
                        if (!hasReferralData) {
                          setValue("Phone", "", { shouldValidate: false });
                          setSelectedCountry(country);
                        }
                      }}
                      className={`inputForm ${getErrorToShow("Phone") ? "invalid" : ""} ${
                        Styles.inputForm
                      }`}
                      style={{
                        backgroundColor: hasReferralData ? "#f5f5f5" : "white",
                        color: hasReferralData ? "#333" : "black",
                        cursor: hasReferralData ? "not-allowed" : "text",
                      }}
                    />
                  </div>

                  {/* Conditional Fields */}
                  {(!form_control?.form_field_enable || form_control.form_field_enable.company_name) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("CompanyName") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.company_name ? "Name of the Company*" : "Name of the Company (Optional)"}
                        autoComplete="new-password"
                        {...register("CompanyName", validationRules.CompanyName)}
                        onFocus={preventAutoFill}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "CompanyName")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.designation) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("Designation") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.designation ? "Designation*" : "Designation (Optional)"}
                        autoComplete="new-password"
                        {...register("Designation", validationRules.Designation)}
                        onFocus={preventAutoFill}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "Designation")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.country) && (
                    <div className={Styles.inputLabelContainer}>
                      <CountryDropdown
                        value={watch("Country")}
                        onChange={(value) => {
                          handleProgressiveFieldChange("Country", value);
                          analytics.trackInputChange("Country", {
                            InputName: "Country",
                            Filled: value !== "",
                            newValue: value,
                          });
                        }}
                        placeholder={form_control?.form_field_enable?.country ? "Select Country*" : "Select Country (Optional)"}
                        className={`${getErrorToShow("Country") ? "invalid" : ""} ${Styles.inputForm}`}
                        required={form_control?.form_field_enable?.country}
                        defaultCountryCode={geoLocationData?.country}
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.years_in_operation) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("YearsInOperation") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.years_in_operation ? "Years in Operation*" : "Years in Operation (Optional)"}
                        min="0"
                        max="100"
                        autoComplete="new-password"
                        {...register("YearsInOperation", validationRules.YearsInOperation)}
                        onFocus={preventAutoFill}
                        onKeyDown={preventNonNumericInput}
                        onPaste={preventNonNumericPaste}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "YearsInOperation")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.number_of_employees) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("NumberOfEmployees") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.number_of_employees ? "Number of Employees*" : "Number of Employees (Optional)"}
                        min="1"
                        max="1000000"
                        autoComplete="new-password"
                        {...register("NumberOfEmployees", validationRules.NumberOfEmployees)}
                        onFocus={preventAutoFill}
                        onKeyDown={preventNonNumericInput}
                        onPaste={preventNonNumericPaste}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "NumberOfEmployees")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.annual_revenue) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("AnnualRevenue") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.annual_revenue ? "Annual Revenue* - e.g., 1000000" : "Annual Revenue (Optional) - e.g., 1000000"}
                        autoComplete="new-password"
                        {...register("AnnualRevenue", validationRules.AnnualRevenue)}
                        onFocus={preventAutoFill}
                        onKeyDown={preventNonNumericInput}
                        onPaste={preventNonNumericPaste}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "AnnualRevenue")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.sector_field) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("SectorField") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.sector_field ? "Sector/Field*" : "Sector/Field (Optional)"}
                        autoComplete="new-password"
                        {...register("SectorField", validationRules.SectorField)}
                        onFocus={preventAutoFill}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "SectorField")
                        }
                      />
                    </div>
                  )}

                  {(!form_control?.form_field_enable || form_control.form_field_enable.referrer_name) && (
                    <div className={Styles.inputLabelContainer}>
                      <input
                        className={`${getErrorToShow("IntroducedBy") ? "invalid" : ""} ${
                          Styles.inputForm
                        }`}
                        placeholder={form_control?.form_field_enable?.referrer_name ? "Name of Person Who Introduced You*" : "Name of Person Who Introduced You (Optional)"}
                        autoComplete="new-password"
                        data-form-type="other"
                        {...register("IntroducedBy", validationRules.IntroducedBy)}
                        onFocus={preventAutoFill}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(e, "IntroducedBy")
                        }
                      />
                    </div>
                  )}

                  {/* Hidden fields to prevent auto-fill */}
                  <input
                    type="text"
                    style={{ display: 'none' }}
                    autoComplete="username"
                  />
                  <input
                    type="password"
                    style={{ display: 'none' }}
                    autoComplete="current-password"
                  />
                  
                  {/* Hidden Programme of Interest Field */}
                  <input
                    type="hidden"
                    {...register("Programme_Of_Interest", validationRules.Programme_Of_Interest)}
                    value={programofinterest || ""}
                  />
                </div>
              </div>
            </div>

            {/* Progressive Error Display */}
            {hasSubmittedOnce && (
              <>
                {showAllRequiredError && (
                  <span className={Styles.smallText} style={{ color: '#dc3545', display: 'block', marginTop: '10px' }}>
                    Required: All required fields must be filled
                  </span>
                )}
                {!showAllRequiredError && currentErrorField && (
                  <span className={Styles.smallText} style={{ color: '#dc3545', display: 'block', marginTop: '10px' }}>
                    {getErrorToShow(currentErrorField)}
                  </span>
                )}
              </>
            )}

            {/* Submission Error Message */}
            {submissionError && (
              <div className={Styles.errorMsg}>{submissionError}</div>
            )}

            {/* Submit Button */}
            <div className={Styles.buttenContainer}>
              <button
                type="submit"
                className={Styles.FormButton}
                disabled={isSubmitDisabled}
                aria-label="submit button"
                style={{
                  opacity: isSubmitDisabled ? 0.6 : 1,
                  cursor: isSubmitDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                <span className={Styles.FormButtonText}>
                  {buttonName || "Submit"}
                </span>
              </button>
            </div>

            {/* Footer Text */}
            <p className={Styles.formFooterText}>
              By submitting this form, <br /> you agree to our
              <a
                href="https://www.digitalregenesys.com/privacy-policy"
                aria-label="Privacy policy"
              >
                {" "}Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    );
  }
);

RequestFormLP.displayName = 'RequestFormLP';

export default React.memo(RequestFormLP);