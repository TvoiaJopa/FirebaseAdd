import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  firestore,
  collection,
  addDoc,
  MESSAGES,
  serverTimestamp,
} from "./Config";
import { useState } from "react";

export default function App() {
  const [newMessage, setNewMessage] = useState("");

  const save = async () => {
    const messageText = newMessage.toString(); // Convert to string
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: messageText,
      created: serverTimestamp(),
    }).catch((error) => console.log(error));
    setNewMessage("");
    console.log("Message saved");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Send message..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)} // Use onChangeText
      />
      <Button title="Send" type="button" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
