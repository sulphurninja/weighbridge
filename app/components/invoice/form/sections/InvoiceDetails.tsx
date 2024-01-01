"use client";

// Components
import {
    CurrencySelector,
    DatePickerFormField,
    FormInput,
    FormFile,
    Subheading,
    TemplateSelector,
    BillFromSection,

} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useState } from "react";

const InvoiceDetails = () => {

    const [netWeight, setNetWeight] = useState(0);

    // Function to update netWeight in the parent component
    const updateNetWeight = (newNetWeight:any) => {
        setNetWeight(newNetWeight);
    };
    const { _t } = useTranslationContext();

    return (
        <section className="flex flex-col flex-wrap gap-5">
            {/* <Subheading>{_t("form.steps.invoiceDetails.heading")}:</Subheading> */}

            <div className="flex flex-row flex-wrap gap-5">
                <div className="flex flex-col gap-2">
                    {/* <FormFile
                        name="details.invoiceLogo"
                        label={_t(
                            "form.steps.invoiceDetails.invoiceLogo.label"
                        )}
                        placeholder={_t(
                            "form.steps.invoiceDetails.invoiceLogo.placeholder"
                        )}
                    /> */}
                    <FormInput
                        name="details.Name"
                        label={_t("form.steps.invoiceDetails.Name")}
                        placeholder="Name"
                    />
                    <FormInput
                        name="details.vehicleNumber"
                        label={_t("form.steps.invoiceDetails.vehicleNumber")}
                        placeholder="Vehicle number"
                    />
                    <div className="flex flex-wrap gap-x-20 gap-y-10">
                        <BillFromSection  />
                        {/* <BillToSection /> */}
                    </div>
                    <FormInput
                        name="details.invoiceNumber"
                        label={_t("form.steps.invoiceDetails.invoiceNumber")}
                        placeholder="S. NO"
                    />

                    <FormInput
                        name="details.rstNumber"
                        label={_t("form.steps.invoiceDetails.rstNumber")}
                        placeholder="RST No."
                    />
                    <FormInput
                        name="details.date1"
                        label={_t("form.steps.invoiceDetails.date1")}
                        placeholder="Date 1 "
                    />
                    <FormInput
                        name="details.date2"
                        label={_t("form.steps.invoiceDetails.date2")}
                        placeholder="Date 2"
                    />

                    <FormInput
                        name="details.time1"
                        label={_t("form.steps.invoiceDetails.time1")}
                        placeholder="G Time"
                    />

                    <FormInput
                        name="details.time2"
                        label={_t("form.steps.invoiceDetails.time2")}
                        placeholder="Time 2"
                    />
                    <FormInput
                        name="details.receivedRs"
                        label={_t("form.steps.invoiceDetails.receivedRs")}
                        placeholder="Received Rs"
                    />


                </div>

                {/* <div className="flex flex-col gap-2">
                    <TemplateSelector />
                </div> */}
            </div>
        </section>
    );
};

export default InvoiceDetails;
