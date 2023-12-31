import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atom/messagesAtom";
import userAtom from "../atom/userAtom";

const Message = ({ ownMessage ,message}) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-start"}>
        <Avatar src={user.profilePic} w={"7"} h={"7"} />
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
        </Flex>
      ) : (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}>
           {message.text}
          </Text>
          <Avatar src={selectedConversation.userProfilePic} w={"7"} h={"7"} />
        </Flex>
      )}
    </>
  );
};

export default Message;
