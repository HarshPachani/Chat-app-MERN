import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import { fileFormat } from "../lib/features";
import RenderAttachment from "../shared/RenderAttachment";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user, groupChat }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;

  const { theme } = useSelector(store => store.chat);
  const timeAgo = moment(createdAt).format('DD-MM-YYYY hh:mm A');

  return (
    // For Animation
    <>
    <motion.div
      initial = {{ opacity: 0, x: '-100%' }}
      whileInView={{ opacity: 1, x: 0 }}

      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        width: "fit-content",
    }}
    >
        <div
            style={{
                backgroundColor: sameSender && attachments.length === 0 ? theme : 'rgb(238, 238, 238)',
                borderRadius: sameSender ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
                padding: "0.5rem",
                color: sameSender && attachments.length === 0 ? 'white' : 'black',
                overflow: 'auto'
            }}
        >
            {(!sameSender && groupChat) && (
                <Typography color={theme} fontWeight={"600"} variant="caption">
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
            style = {{
                alignSelf: sameSender ? 'flex-end' : '',
                width: 'fit-content'
            }}
        >
            {timeAgo}
        </Typography>
    </motion.div>
    </>
  );
};

export default memo(MessageComponent);
