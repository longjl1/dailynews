import { Resend } from 'resend';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();
    console.log("Received email:", email);
    // TODO: save the email to database and send welcome email

    const resend = new Resend(process.env.RESEND_API_KEY);
    // create a contact account
    const {error: createError} = await resend.contacts.create(
        {
            email: email,
        }
    )
    if (createError) {
        return NextResponse.json({
            error:createError.message,
        }, { status: 500 })
    }
    // add the contact to segment
    const { error: addError } = await resend.contacts.segments.add({
        email: email,
        segmentId: 'aa3e1fe8-8af6-4fb9-b50c-4a5441b1cc79',
    }) 
    if (addError) {
        return NextResponse.json({
            error:addError.message,
        }, { status: 500 })
    }

    return  NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 });
}