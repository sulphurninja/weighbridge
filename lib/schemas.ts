// Helpers
import { formatNumberWithCommas } from "@/lib/helpers";
import { z } from 'zod';
// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Field Validators
const fieldValidators = {
    string: z.any(),
    stringOptional: z.any(),
    stringMin1: z.any(),
    stringToNumber: z.any(),
    stringToNumberWithMax: z.any(),
    nonNegativeNumber: z.any(),
};

const CustomInputSchema = z.object({
    key: fieldValidators.string,
    value: fieldValidators.string,
});

const InvoiceSenderSchema = z.object({
    name: fieldValidators.string,
    address: fieldValidators.string,
    zipCode: fieldValidators.string,
    city: fieldValidators.string,
    country: fieldValidators.string,
    email: fieldValidators.string,
    phone: fieldValidators.string,
    customInputs: z.array(CustomInputSchema).optional(),
});

const InvoiceReceiverSchema = z.object({
    name: fieldValidators.string,
    address: fieldValidators.string,
    zipCode: fieldValidators.string,
    city: fieldValidators.string,
    country: fieldValidators.string,
    email: fieldValidators.string,
    phone: fieldValidators.string,
    customInputs: z.array(CustomInputSchema).optional(),
});

const ItemSchema = z.object({
    name: fieldValidators.stringMin1,
    description: fieldValidators.stringOptional,
    quantity: fieldValidators.stringToNumber,
    unitPrice: fieldValidators.stringToNumber,
    total: fieldValidators.stringToNumber,
});

const PaymentInformationSchema = z.object({
    bankName: fieldValidators.stringMin1,
    accountName: fieldValidators.stringMin1,
    accountNumber: fieldValidators.stringMin1,
});

const DiscountDetailsSchema = z.object({
    amount: fieldValidators.stringToNumberWithMax,
    amountType: fieldValidators.string,
});

const TaxDetailsSchema = z.object({
    amount: fieldValidators.stringToNumberWithMax,
    taxID: fieldValidators.string,
    amountType: fieldValidators.string,
});

const ShippingDetailsSchema = z.object({
    cost: fieldValidators.stringToNumberWithMax,
    costType: fieldValidators.string,
});

const SignatureSchema = z.object({
    data: fieldValidators.string,
    fontFamily: fieldValidators.string.optional(),
});

const InvoiceDetailsSchema = z.object({
    invoiceLogo: fieldValidators.stringOptional,
    invoiceNumber: fieldValidators.stringMin1,
    vehicleNumber: fieldValidators.stringMin1,
    rstNumber: fieldValidators.stringMin1,
    date1: fieldValidators.stringMin1,
    date2: fieldValidators.stringMin1,
    time1: fieldValidators.stringMin1,
    time2: fieldValidators.stringMin1,
    receivedRs: fieldValidators.stringMin1,
    Name: fieldValidators.stringMin1,
    // invoiceDate: fieldValidators.date,
    // dueDate: fieldValidators.date,
    purchaseOrderNumber: fieldValidators.stringOptional,
    currency: fieldValidators.string,
    language: fieldValidators.string,
    items: z.array(ItemSchema),
    paymentInformation: PaymentInformationSchema.optional(),
    taxDetails: TaxDetailsSchema.optional(),
    discountDetails: DiscountDetailsSchema.optional(),
    shippingDetails: ShippingDetailsSchema.optional(),
    subTotal: fieldValidators.nonNegativeNumber,
    totalAmount: fieldValidators.nonNegativeNumber,
    totalAmountInWords: fieldValidators.string,
    additionalNotes: fieldValidators.stringOptional,
    paymentTerms: fieldValidators.stringMin1,
    signature: SignatureSchema.optional(),
    updatedAt: fieldValidators.stringOptional,
    pdfTemplate: z.number(),
});

const InvoiceSchema = z.object({
    sender: InvoiceSenderSchema.optional(),
    receiver: InvoiceReceiverSchema.optional(),
    details: InvoiceDetailsSchema.optional(),
});

export { InvoiceSchema, ItemSchema };
