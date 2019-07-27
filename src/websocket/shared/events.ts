export enum WebsocketEvents {
  GET_EVENTS = 'notify.events',
  NEW_EVENT = 'notify.new_event',
  DELETE_EVENT = 'notify.delete_event',
  DELETE_EVENTS = 'notify.delete_events',
  READ_EVENTS = 'notify.read_events',

  NOTIFY_OBJECTS = 'notify.objects',
  NOTIFY_OBJECTS_UNSUBSCRIBE = 'notify.objects.unsubscribe',
}
