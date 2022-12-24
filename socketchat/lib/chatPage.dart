import 'package:flutter/material.dart';
import 'package:socketchat/widgetUseritem.dart';
import 'package:get/get.dart';
import 'contronllers/ketNoiHubChat.dart';
import 'detailChatPage.dart';

class ChatPage extends StatefulWidget {
  @override
  State<ChatPage> createState() {
    return ChatScreenState();
  }
}

class ChatScreenState extends State<ChatPage> {
  final KetNoiHubController ketNoiHubCtr = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login as hoainam10th'),
      ),
      body: Obx(()=>ListView.builder(
          itemCount: ketNoiHubCtr.onlineUsers.length,
          itemBuilder: (context, index) => GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => DetailChatPage(userName: ketNoiHubCtr.onlineUsers[index],)
                  ),
                );
              },
              child: UserItem(username: ketNoiHubCtr.onlineUsers[index],)
          ))),
    );
  }
}