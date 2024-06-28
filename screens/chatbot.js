// ChatBot.js
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const ChatBot = () => {
  const userDetails = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: t("welcome"),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar: "https://cdn-icons-png.freepik.com/512/3273/3273660.png",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    handleUserMessage(messages[0].text);
  }, []);

  const handleUserMessage = (message) => {
    const response = generateResponse(message);
    if (response) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random().toString(),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Bot",
            avatar: "https://cdn-icons-png.freepik.com/512/3273/3273660.png",
          },
        })
      );
    }
  };

  const generateResponse = (message) => {
    const normalizedMessage = message.toLowerCase();
    if (
      normalizedMessage.includes("beach") ||
      normalizedMessage.includes("شاطئ")
    ) {
      return t("beach");
    } else if (
      normalizedMessage.includes("mountain") ||
      normalizedMessage.includes("جبل")
    ) {
      return t("mountain");
    } else if (
      normalizedMessage.includes("adventure") ||
      normalizedMessage.includes("مغامرة")
    ) {
      return t("adventure");
    } else if (
      normalizedMessage.includes("romantic") ||
      normalizedMessage.includes("رومانسي")
    ) {
      return t("romantic");
    } else if (
      normalizedMessage.includes("budget") ||
      normalizedMessage.includes("ميزانية")
    ) {
      return t("budget");
    } else if (
      normalizedMessage.includes("luxury") ||
      normalizedMessage.includes("فاخر")
    ) {
      return t("luxury");
    } else if (
      normalizedMessage.includes("culture") ||
      normalizedMessage.includes("ثقافة")
    ) {
      return t("culture");
    } else {
      return t("unsure");
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: styles.rightBubble,
          left: styles.leftBubble,
        }}
        textStyle={{
          right: styles.rightText,
          left: styles.leftText,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Icon name="send" size={24} color="#fff" />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      placeholder={t("Type your message here...")}
      showUserAvatar
      alwaysShowSend
    />
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 25,
    width: 40,
    height: 40,
    backgroundColor: "#FF81AE",
    borderRadius: 20,
  },
  rightBubble: {
    backgroundColor: "#FF81AE",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  leftBubble: {
    backgroundColor: "#e9bcbe",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  rightText: {
    color: "#fff",
    fontSize: 16,
  },
  leftText: {
    color: "#000",
    fontSize: 16,
  },
});

export default ChatBot;
