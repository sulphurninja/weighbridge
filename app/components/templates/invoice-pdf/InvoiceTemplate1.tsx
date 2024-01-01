import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate = (data: InvoiceType) => {


    const { sender, receiver, details } = data;

    // Calculate net weight using the same logic as in BillFromSection
    const calculateNetWeight = () => {
        const grossWeight = parseFloat(sender?.address || 0);
        const tareWeight = parseFloat(sender?.zipCode || 0);
        const netWeight = grossWeight - tareWeight;
        return isNaN(netWeight) ? 0 : netWeight;
    };

    return (
        <InvoiceLayout data={data}>
            <div className="flex justify-between">
                <div>
                    {details?.invoiceLogo && (
                        <img
                            src={details?.invoiceLogo}
                            width={140}
                            height={100}
                            alt={`Logo of ${sender?.name}`}
                        />
                    )}
                    {/* <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
                        {sender.name}
                    </h1> */}
                </div>
                <div className="block">
                    {/* <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Invoice #
                    </h2> */}
                    {/* <span className="mt-1 block text-gray-500">
                        Sr.No {details.invoiceNumber}
                       
                    </span>
                    <h1>
                            Rst.No {details.invoiceNumber}

                        </h1> */}
                </div>
            </div>

            <div className=" grid ml-2 sm:grid-cols-2 gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                    <dd className="col-span-3 text-gray-500">
                {details?.Name ? details.Name : <span style={{ visibility: 'hidden' }}>{"\u200B"}</span>}
            </dd>
                        <span>{details?.vehicleNumber}</span>
                    </h3>

                </div>
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 mt-6 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-6 gap-x-3">

                            <dt className="col-span-2  -mt-3 font-semibold text-gray-800">
                                <h3 className="text-lg  font-semibold text-gray-800">
                                    <span className="">{details?.invoiceNumber ? details.invoiceNumber : <span style={{ visibility: 'hidden' }}>{"\u200B"}</span>}</span>
                                    <span className="block">{details?.rstNumber? details.rstNumber : <span style={{ visibility: 'hidden' }}>{"\u200B"}</span>}</span>
                                </h3>
                            </dt>
                            <dd className="col-span-3 mt-12 ml-56 absolute text-gray-500">
                                {details?.time1}
                            </dd>
                            <dt className="col-span-3 mt-20 ml-56 absolute text-gray-500">
                                {details?.time2}
                            </dt>
                        </dl>
                        <dl className="grid -mt-2  ml-6 sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-2 absolute font-semibold text-gray-800">
                                {details?.date1}
                            </dt>
                            <dt className=" absolute mt-8  col-span-2 font-semibold text-gray-800">
                                {details?.date2}
                            </dt>
                        </dl>
                    </div>
                </div>
            </div>
            <div className=" space-y-2">
                <address className=" ml-20  not-italic text-gray-800">
                    <span className='text-xl font-bold'>{sender?.address} kg</span>
                    <br />
                    <span className='text-xl font-bold'>{sender?.zipCode} kg</span>
                    <br />
                    <span className='text-xl font-bold'>{calculateNetWeight()} kg</span>
                    <br />
                </address>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">

                        <dd className="col-span-2 mt-2 text-gray-500">
                            {details?.receivedRs}

                        </dd>
                    </dl>
                </div>
            </div>


            <div className="mt-2  sm:justify-start">

            </div>



            {/* Signature */}
            {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
                <div className="mt-6">
                    <p className="font-semibold text-gray-800">Signature:</p>
                    <img
                        src={details.signature.data}
                        width={120}
                        height={60}
                        alt={`Signature of ${sender?.name}`}
                    />
                </div>
            ) : details?.signature?.data ? (
                <div className="mt-6">
                    <p className="text-gray-800">Signature:</p>
                    <p
                        style={{
                            fontSize: 30,
                            fontWeight: 400,
                            fontFamily: `${details?.signature.fontFamily}, cursive`,
                            color: "black",
                        }}
                    >
                        {details?.signature.data}
                    </p>
                </div>
            ) : null}
        </InvoiceLayout>
    );
};

export default InvoiceTemplate;
