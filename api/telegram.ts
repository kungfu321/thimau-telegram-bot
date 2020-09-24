import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const body = req.body.message;
    console.log(body);
    const teleToken = req.query.token;
    if (body.new_chat_member) {
      const newMember = body.new_chat_member;
      const data = {
        chat_id: `@${body.chat.username}`,
        text: `Hi <i><b>${parseUsername(newMember.first_name, newMember.last_name)}</b></i>,\nChào mừng bạn đến với <strong>${body.chat.title}</strong>.\nChúc bạn chửa hoang thành công.`,
        parse_mode: "HTML"
      };

      await axios.post(
        `https://api.telegram.org/bot${teleToken}/sendMessage`,
        data
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

function parseUsername(first_name, last_name) {
  return `${first_name ? first_name : ''} ${last_name ? last_name : ''}`.trim();
}
