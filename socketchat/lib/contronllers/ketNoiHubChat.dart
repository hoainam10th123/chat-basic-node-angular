import 'package:get/get.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:socket_io_client/socket_io_client.dart';
import 'package:socketchat/models/message.dart';

class KetNoiHubController extends GetxController {
  var onlineUsers = <String>[].obs;
  late IO.Socket socket;
  var groupName = ''.obs;
  var messages = <Message>[].obs;

  createConnection(String user){
    socket = IO.io('http://10.0.2.2:7000',
        OptionBuilder()
            .setTransports(['websocket']) // for Flutter or Dart VM
            .disableAutoConnect()  // disable auto-connection
            .setExtraHeaders({'foo': 'bar'}) // optional
            .build()
    );
    socket.connect();

    socket.onConnect((_) {
      print('connect');
      socket.emit('OnConnected', user);
    });

    socket.on('GetOnlineUsers', GetOnlineUsers);

    socket.on('UserIsOnline', UserIsOnline);

    socket.on('UserIsOffline', UserIsOffline);

    socket.on('NewMessage', NewMessage);

    socket.onDisconnect((_) => print('disconnect'));
  }

  void GetOnlineUsers(dynamic data){
    print('Users online');
    final memberServer = data as List<dynamic>;
    memberServer.forEach((element) {
      onlineUsers.add(element);
    });
  }

  void UserIsOnline(dynamic data){
    onlineUsers.add(data);
  }

  void UserIsOffline(dynamic data){
    onlineUsers.remove(data);
  }

  void NewMessage(dynamic data){
    final memberServer = data as Map<String, dynamic>;
    final mess = Message.fromJson(memberServer);
    messages.add(mess);
  }

  void clearMessages(){
    messages.clear();
  }

  ketNoiToiRoom(String user, String otherUser){
    final group = getGroupName(user, otherUser);
    groupName.value = group;
    Map<String, String> params = <String, String>{};
    params['username'] = user;
    params['groupName'] = group;
    socket.emit('OnConnectedRoom', params);
  }

  void stopGroupConnection(){
    socket.emit('OnDisConnectedRoom', groupName.value);
  }

  String getGroupName(String user, String otherUser){
    var result = user.compareTo(otherUser) < 0;
    return result ? '$user-$otherUser' : '$otherUser-$user';
  }

  sendPrivateMessage(String content, String otherUser){
    Map<String, String> params = <String, String>{};
    params['recipientUsername'] = otherUser;
    params['content'] = content;
    params['groupName'] = getGroupName('hoainam10th', otherUser);
    socket.emit('SendMessage', params);
  }
}