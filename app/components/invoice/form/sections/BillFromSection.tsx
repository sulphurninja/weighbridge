"use client";

// RHF
import { useFieldArray, useFormContext } from "react-hook-form";

// Components
import {
    BaseButton,
    FormCustomInput,
    FormInput,
    Subheading,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { Plus } from "lucide-react";

const BillFromSection = () => {
    const { control, getValues } = useFormContext();
    const { _t } = useTranslationContext();

    const CUSTOM_INPUT_NAME = "sender.customInputs";
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: CUSTOM_INPUT_NAME,
    });

    const addNewCustomInput = () => {
        append({
            key: "",
            value: "",
        });
    };

    const removeCustomInput = (index: number) => {
        remove(index);
    };

    // Calculate net weight based on gross and tare weight
    const calculateNetWeight = () => {
        const grossWeight = parseFloat(getValues("sender.address") || 0);
        const tareWeight = parseFloat(getValues("sender.zipCode") || 0);
        const netWeight = grossWeight - tareWeight;
        return isNaN(netWeight) ? 0 : netWeight;
    };


    return (
        <section className="flex flex-col gap-3">
            {/* <Subheading>{_t("form.steps.fromAndTo.billFrom")}:</Subheading> */}

            {/* <FormInput
                name="sender.name"
                label={_t("form.steps.fromAndTo.name")}
                placeholder="Your name"
            /> */}
            <FormInput
                name="sender.address"
                label={_t("form.steps.fromAndTo.address")}
                placeholder="Gross Weight"
            />
            <FormInput
                name="sender.zipCode"
                label={_t("form.steps.fromAndTo.zipCode")}
                placeholder="Tare Weight"
            />
            {/* <FormInput
                name="sender.city"
                label={_t("form.steps.fromAndTo.city")}
                placeholder="Net Weight" */}

            <FormInput
                name="sender.country"
                label="Net Weight"
                placeholder="Net Weight"
                readOnly
                value={calculateNetWeight().toString()}
            />
            {/* <FormInput
                name="sender.email"
                label={_t("form.steps.fromAndTo.email")}
                placeholder="Your email"
            />
            <FormInput
                name="sender.phone"
                label={_t("form.steps.fromAndTo.phone")}
                placeholder="Your phone number"
            /> */}




        </section>
    );
};

export default BillFromSection;
