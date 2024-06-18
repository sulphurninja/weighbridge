import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { getInvoiceTemplate } from "@/lib/helpers";
import { InvoiceType } from "@/types";

const PDFSHIFT_API_KEY ='sk_3246f0a976d3e15e8e927e66454d31a831553f8c';

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */

export async function generatePdfService(req: NextRequest): Promise<NextResponse> {
    const body: InvoiceType = await req.json();

    try {
        const ReactDOMServer = (await import("react-dom/server")).default;

        // Get the selected invoice template
        const templateId = body?.details?.pdfTemplate;

        if (templateId === undefined) {
            throw new Error("PDF template ID is undefined");
        }

        const InvoiceTemplate = await getInvoiceTemplate(templateId);

        // Read the HTML template from a React component
        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

        console.log(htmlTemplate, 'html temp');

        // Add Tailwind CSS to the HTML template
        const htmlWithTailwind = `
            <!DOCTYPE html>
            <html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body>
                ${htmlTemplate}
            </body>
            </html>
        `;

        // Use pdfshift API to generate PDF
        const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
            method: "POST",
            headers: {
                Authorization: 'Basic ' + Buffer.from(`api:${PDFSHIFT_API_KEY}`).toString('base64'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ source: htmlWithTailwind })
        });

        if (!response.ok) {
            throw new Error(`PDF generation failed: ${response.statusText}`);
        }

        const pdfBuffer = await response.buffer();

        console.log("Generated PDF Buffer:", pdfBuffer.toString("base64"));

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

        const nextResponse = new NextResponse(pdfBlob, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=invoice.pdf",
            },
            status: 200,
        });

        return nextResponse;
    } catch (error) {
        console.error(error);

        // Return an error response
        return new NextResponse(`Error generating PDF: \n${error}`, {
            status: 500,
        });
    }
}
