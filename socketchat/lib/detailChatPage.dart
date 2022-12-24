import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'contronllers/ketNoiHubChat.dart';

class DetailChatPage extends StatefulWidget {
  final String userName;

  DetailChatPage({Key? key, required this.userName});

  @override
  State<DetailChatPage> createState() {
    return DetailChatScreenState();
  }
}

class DetailChatScreenState extends State<DetailChatPage> {
  final TextEditingController contentController = TextEditingController();
  final KetNoiHubController ketNoiHubCtrl = Get.find();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    ketNoiHubCtrl.ketNoiToiRoom('hoainam10th', widget.userName);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        flexibleSpace: SafeArea(
          child: Container(
            padding: const EdgeInsets.only(right: 16),
            child: Row(
              children: <Widget>[
                IconButton(
                  onPressed: () {
                    // event exit chat screen with people, back button on app bar
                    ketNoiHubCtrl.stopGroupConnection();
                    ketNoiHubCtrl.clearMessages();
                    Navigator.pop(context);
                  },
                  icon: const Icon(
                    Icons.arrow_back,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(
                  width: 2,
                ),
                const CircleAvatar(
                  backgroundImage: AssetImage('assets/images/user.png'),
                  maxRadius: 25,
                ),
                const SizedBox(
                  width: 12,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        widget.userName,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(
                        height: 6,
                      ),
                      Text(
                        'vừa mới truy cập',
                        style: TextStyle(
                            color: Colors.grey.shade600, fontSize: 13),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(5),
        height: 80,
        width: double.infinity,
        color: Colors.white,
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: contentController,
                decoration: InputDecoration(
                    hintText: "Write message...",
                    hintStyle: const TextStyle(color: Colors.black),
                    filled: true,
                    fillColor: Colors.grey.withOpacity(0.2),
                    border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                      borderRadius: BorderRadius.circular(30),
                    )),
              ),
            ),
            const SizedBox(
              width: 5,
            ),
            FloatingActionButton(
              onPressed: () async {
                if (contentController.text.isNotEmpty) {
                  ketNoiHubCtrl.sendPrivateMessage(contentController.text, widget.userName);
                  contentController.clear();
                }
              },
              child: Icon(
                Icons.send,
                color: Colors.white,
                size: 20,
              ),
              backgroundColor: Colors.blue,
              elevation: 0,
            ),
          ],
        ),
      ),
      body: SizedBox(
        height: MediaQuery.of(context).size.height,
        child: Obx(()=>ListView.builder(
            itemCount: ketNoiHubCtrl.messages.length,
            shrinkWrap: true,
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.only(top: 10, bottom: 10),
            itemBuilder: (context, index) {
              final leftOrRight = ketNoiHubCtrl.messages[index].senderUsername == 'hoainam10th';
              return Container(
                  padding:
                  const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  child: Row(
                    mainAxisAlignment: leftOrRight
                        ? MainAxisAlignment.end
                        : MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      leftOrRight
                          ? Text('')
                          : CircleAvatar(
                        backgroundImage:
                        AssetImage('assets/images/user.png'),
                        radius: 15,
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Container(
                        width: 250,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: Colors.blue[200],
                        ),
                        padding: const EdgeInsets.all(16),
                        child: Text(
                          ketNoiHubCtrl.messages[index].content!,
                          style: const TextStyle(fontSize: 15),
                        ),
                      ),
                    ],
                  ));
            })),
      ),
    );
  }
}
