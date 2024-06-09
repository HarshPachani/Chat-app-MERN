import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { orange } from "../constants/color";
import moment from "moment";
import { fileFormat } from "../lib/features";
import RenderAttachment from "../shared/RenderAttachment";
// import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    // For Animation
    // <motion.div
    <>
    <div
      initial = {{ opacity: 0, x: '-100%' }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        width: "fit-content",
    }}
    >
        <div
            style={{
                backgroundColor: sameSender && attachments.length === 0 ? orange : 'rgb(238, 238, 238)',
                borderRadius: sameSender ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
                padding: "0.5rem",
                color: sameSender && attachments.length === 0 ? 'white' : 'black',
                overflow: 'auto'
            }}
        >
            {!sameSender && (
                <Typography color={orange} fontWeight={"600"} variant="caption">
                {sender.name}
                </Typography>
            )}
            {content && <Typography>{content}</Typography>}
            {/* Attachment */}
            {attachments.length > 0 &&
                attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);

                return (
                    <Box key={index}>
                        <a
                            href={url}
                            target="_blank"
                            download
                            style={{
                                color: "black",
                            }}
                        >
                            {RenderAttachment(file, url)}
                        </a>
                    </Box>
                );
                })}
        </div>
        <Typography
            variant="caption"
            color="text.secondary"
        >
            {timeAgo}
        </Typography>
    </div>
    </>
  );
};

export default memo(MessageComponent);
