import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/Notes-WebHook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webHookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET env variable");
        }

        // Check header
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            throw new Response("Error occurred -- no svix header", {
                status: 400,
            });
        }

        const payload = await request.json();
        console.log("Payload", payload);

        const body = JSON.stringify(payload);
        console.log("Body", body);

        const wh = new Webhook(webHookSecret);

        let evt: any;


        // Verify web hook

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp
            } as any)
        } catch (error) {
            console.log("Error veryifying webhook : ", error);
            throw new Response("Error occurred ", { status: 400 });
        }

        const eventType = evt.type;

        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;

            const email = email_addresses[0].email_address;
          

            try {
                await ctx.runMutation(api.user.createUser, {
                    email,
                    firstname: first_name,
                    lastname :last_name,
                    imageUrl: image_url,
                    clerkId: id,
                  
                })
            }
            catch (error) {
                console.log("Error veryifying webhook : ", error);
                throw new Response("Error occurred ", { status: 500 });
            }
        }

        return new Response("Webhook proccesd successfully!!", { status: 200 })
    })
})


export default http;