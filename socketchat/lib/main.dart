import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'const.dart';
import 'contronllers/ketNoiHubChat.dart';

void main() {
  runApp(const MyApp());
  // vì mục đích demo, nên khi app chạy lên mặc định đăng nhập user là hoainam10th gán cứng
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  final KetNoiHubController ketNoiHubCtr = Get.put(KetNoiHubController());

  int pageIndex = 0;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    ketNoiHubCtr.createConnection('hoainam10th');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[pageIndex],
      bottomNavigationBar: CupertinoTabBar(
        onTap: (index){
          setState(() {
            //pageIndex = index;
          });
        },
        currentIndex: pageIndex,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.chat, size: 35,), label: 'Chat'),
          BottomNavigationBarItem(icon: Icon(Icons.group, size: 35,), label: 'Group'),
          BottomNavigationBarItem(icon: Icon(Icons.rss_feed, size: 35,), label: 'Feed'),
          BottomNavigationBarItem(icon: Icon(Icons.account_box, size: 35,), label: 'Profile'),
        ],),
    );
  }
}
