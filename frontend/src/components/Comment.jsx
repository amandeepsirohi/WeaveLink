import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";



const Comment = ({reply ,lastReply}) => {
  return (
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{reply?.username}</Text>
                </Flex>
                <Text>{reply?.text}</Text>
            </Flex>
        </Flex>
        {!lastReply ? <Divider /> :null}
    </>
  )
}

export default Comment;