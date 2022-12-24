
import 'chatPage.dart';

List pages = [ChatPage()];

const serverName = "10.0.2.2"; //10.0.2.2 for mobile or localhost for desktop app
const urlBase = "http://$serverName:5291";
const hubUrl = "http://$serverName:5291/hubs/";