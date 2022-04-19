import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView,
} from "react-native";
import React from "react";

const Keyboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View>dfljsdlkfj</View>
      </View>
      <View style={styles.foot}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <TextInput placeholder="Email.." style={styles.textinput} />
          <TextInput placeholder="Email.." style={styles.textinput} />
          <TextInput placeholder="Email.." style={styles.textinput} />
          <Text style={styles.btn}>Submit</Text>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    flex: 1,
    backgroundColor: "green",
  },
  foot: {
    paddingTop: 40,
    height: 300,
    backgroundColor: "yellow",
  },
  textinput: {
    borderRadius: 5,
    backgroundColor: "red",
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "blue",
    height: 40,
    borderRadius: 5,
    marginHorizontal: 30,
    textAlign: "center",
    color: "white",
    paddingTop: 12,
    marginTop: 10,
  },
});
