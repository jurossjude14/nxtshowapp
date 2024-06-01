import { sendMail } from "@/lib/mail";

export const senddata = async (body) => {
    try {
        "use server";
        const { fullname, phone, email, webservice, datelog } = body
        await sendMail({
            to: "jurosswebtwopointzero@gmail.com",
            name: "Juross Madrid",
            subject: `New Lead Message from ${fullname}`,
            body: `
            Full Name: ${fullname}
            Phone: ${phone}
            Email: ${email}
            Webservice: ${webservice}
            Date:${datelog}
            `,
        });

    } catch (error) {
        console.log(error)
    }
};


