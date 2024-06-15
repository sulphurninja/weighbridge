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
                    `https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar`
                ),
                headless: true,
                ignoreHTTPSErrors: true,
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
        console.log(htmlTemplate, 'html');
        // Set the HTML content of the page
        await page.setContent(await htmlTemplate, {
            // * "waitUntil" prop makes fonts work in templates
            waitUntil: "networkidle0",
        });

        // Add Tailwind CSS
        await page.addStyleTag({
            url: "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        });

        // Generate the PDF
        const pdf: Buffer = await page.pdf({
            format: "a4",
            printBackground: true,
        });
        console.log("Generated PDF Buffer:", pdf.toString("base64"));

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
