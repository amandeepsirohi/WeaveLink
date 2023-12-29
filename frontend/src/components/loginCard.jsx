import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atom/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atom/userAtom";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const showToast = useShowToast();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      ml={"-750px"}
      w={"2000px"}
      transform={"translate(-50%"}>
      <Image
        src="https://static.cdninstagram.com/rsrc.php/yC/r/jxB9GUOHTf2.webp"
        zIndex={"-1"}
        mt={"-100px"}
      />
      <Flex align={"center"} justify={"center"} mt={"-500px"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            ml={"82px"}
            mt={"200px"}
            w={{
              base: "full",
              sm: "400px",
            }}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                p={6}
                bg={useColorModeValue("white", "#1e1e1e")}
                  type="text"
                  borderRadius={"11px"}
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      username: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                   borderRadius={"11px"}
                  bg={useColorModeValue("white", "#1e1e1e")}
                  p={6}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((inputs) => ({
                        ...inputs,
                        password: e.target.value,
                      }))
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                p={7}
                  loadingText="Logging in"
                  size="lg"
                  bg={useColorModeValue("#1e1e1e", "white")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.100"),
                  }}
                  onClick={handleLogin}
                  isLoading={loading}
                  borderRadius={"11px"}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?{" "}
                  <Link color={"blue."} onClick={() => setAuthScreen("signup")}>
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
