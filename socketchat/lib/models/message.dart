class Message{
  String? senderUsername;
  String? recipientUsername;
  String? content;


  Message(
      {this.senderUsername,
        this.recipientUsername,
        this.content,
      });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      senderUsername: json['senderUsername'],
      recipientUsername: json['recipientUsername'],
      content: json['content'],
    );
  }
}