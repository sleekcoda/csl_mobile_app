class AlertModel {
  final String userId;
  final String alertType;
  final String location;
  final String priority;
  final String comment;
  final List pictures;
  final List videos;

  AlertModel(this.alertType, this.comment, this.location, this.priority,
      this.userId, this.pictures, this.videos);

  factory AlertModel.fromJson(dynamic json) {
    return AlertModel(
      json['alertType'] as String,
      json['comment'] as String,
      json["location"] as String,
      json["priority"] as String,
      json["userId"] as String,
      json["pictures"] as List,
      json["videos"] as List,
    );
  }

  // factory AlertModel.toJson(AlertModel alertModel) {
  //   return {
  //     "alertType": alertModel.alertType,
  //     "comment": alertModel.comment,
  //     "location": alertModel.location,
  //     "priority": alertModel.priority,
  //     "userId": alertModel.userId,
  //     "pictures": alertModel.pictures,
  //     "videos": alertModel.videos,
  //   }
  // }
}
