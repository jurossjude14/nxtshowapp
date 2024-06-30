
'use client'

import Qrscanhtml from "./qrscanhtml";

const qrscanner = () => {

    return (
        <>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">QR Scanner</h1>
                    <p className="text-balance text-muted-foreground">
                        Please Provide QR Code
                    </p>
                </div>
                <div className="grid gap-4">
                    <Qrscanhtml />
                </div>
            </div>
        </>
    )
}

export default qrscanner
