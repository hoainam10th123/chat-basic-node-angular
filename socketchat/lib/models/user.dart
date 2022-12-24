class User {
  String username;
  String token;
  String displayName;

  User(
      {required this.username, required this.token, required this.displayName});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      username: json['username'],
      token: json['token'],
      displayName: json['displayName'],
    );
  }

  Map<String, dynamic> toJson() =>
      {
        'username': username,
        'token': token,
        'displayName': displayName,
      };
}