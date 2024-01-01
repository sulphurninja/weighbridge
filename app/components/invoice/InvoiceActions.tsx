"use client";

// ShadCn
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Components
import {
    PdfViewer,
    BaseButton,
    NewInvoiceAlert,
    InvoiceLoaderModal,
    InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import { FileInput, FolderUp, Import, Plus } from "lucide-react";
import { FORM_FILL_VALUES } from "@/lib/variables";

import { useFormContext } from "react-hook-form";

const InvoiceActions = () => {
    const { invoicePdfLoading } = useInvoiceContext();
    const { reset, formState } = useFormContext();
    return (
        <div className={`xl:w-[45%]`}>
            <Card className="h-auto sticky top-0 px-2">
                <CardHeader>
                    <CardTitle>ACTIONS</CardTitle>
                    <CardDescription>Operations and preview</CardDescription>
                </CardHeader>

                <div className="flex flex-col flex-wrap items-center gap-2">
                    <div className="flex flex-wrap gap-3">
                        {/* Load modal button */}
                        {/* <InvoiceLoaderModal>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Open load invoice menu"
                                disabled={invoicePdfLoading}
                            >
                                <FolderUp />
                                Load Invoice
                            </BaseButton>
                        </InvoiceLoaderModal> */}

                        {/* Export modal button */}
                        {/* <InvoiceExportModal>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Open load invoice menu"
                                disabled={invoicePdfLoading}
                            >
                                <Import />
                                Export Invoice
                            </BaseButton>
                        </InvoiceExportModal> */}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* New invoice button */}
                        <NewInvoiceAlert>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Get a new invoice form"
                                disabled={invoicePdfLoading}
                            >
                                <Plus />
                                New Paavti
                            </BaseButton>
                        </NewInvoiceAlert>

                        {/* Generate pdf button */}
                        <BaseButton
                            type="submit"
                         
                            tooltipLabel="Generate your invoice"
                            loading={invoicePdfLoading}
                            loadingText="Generating your invoice"
                        >
                            <FileInput />
                            Generate Paavti
                        </BaseButton>
                    </div>

                    <div className="w-full">
                        {/* Live preview and Final pdf */}
                        <PdfViewer />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default InvoiceActions;
