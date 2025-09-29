//Lay resource tu id

import { eq } from "drizzle-orm";
import { db } from "../db";
import { resources } from "../db/schema/resources";


export const getResourceById = async (resourceId: string) => {
    const [resource] = await db
        .select()
        .from(resources)
        .where(eq(resources.id, resourceId));
    return resource;
}