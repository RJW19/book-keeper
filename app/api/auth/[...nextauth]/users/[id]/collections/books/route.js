import book from "../../../../../../../../models/book";
import { connectToDB } from "../../../../../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const book = await book.find({ title: params.title }).populate("title");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
