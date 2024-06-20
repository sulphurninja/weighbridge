import { NextRequest, NextResponse } from "next/server";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Types
import { InvoiceType } from "@/types";

const ENV = process.env.NODE_ENV;

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
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
        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
            InvoiceTemplate(body)
        );

        // Create a browser instance
        let browser;

        // Launch the browser in production or development mode depending on the environment
        if (ENV === "production") {
            const puppeteer = await import("puppeteer-core");
            browser = await puppeteer.launch({
                 args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(
                    `https://github.com/Sparticuz/chromium/releases/download/v119.0.0/chromium-v119.0.0-pack.tar`
                ),
                headless:
                    chromium.headless === "new" ? true : chromium.headless,
            });
        } else if (ENV === "development") {
            const puppeteer = await import("puppeteer");
            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: "new",
            });
                }

        if (!browser) {
            throw new Error("Failed to launch browser");
        }

        const page = await browser.newPage();

        // Include Google Fonts in the HTML
        const htmlWithGoogleFonts = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
                 <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                    }
                </style>
            </head>
            <body>
                ${htmlTemplate}
            </body>
            </html>
        `;

        // Set the HTML content of the page and wait until the DOM content is loaded
        await page.setContent(htmlWithGoogleFonts, {
            waitUntil: "domcontentloaded",
            });

        // Add Tailwind CSS
        await page.addStyleTag({
            url: "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        });

        // Ensure fonts are loaded before generating the PDF
        // Generate the PDF
        const pdf: Buffer = await page.pdf({
            format: "a4",
            printBackground: true,
        });
         // Close the Puppeteer browser
        await browser.close();

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdf], { type: "application/pdf" });

        const response = new NextResponse(pdfBlob, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=invoice.pdf",
            },
            status: 200,
        });

        return response;
    } catch (error) {
        console.error(error);
        
        // Return an error response
        return new NextResponse(`Error generating PDF: \n${error}`, {
            status: 500,
        });
    }
}
