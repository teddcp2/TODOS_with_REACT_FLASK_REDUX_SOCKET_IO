from flask import Flask, jsonify, send_from_directory
from mongoConnect import todo
from flask_socketio import SocketIO, send, emit

# import eventlet
# eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*', engineio_logger=True)


@app.route('/')
def serve_static_index():
    return send_from_directory('../../client/todo_task_app/public', 'index.html')


def get_status_counts():
    counts = {}
    counts['New'] = todo.count_documents({'status': 'new'})
    counts['Progress'] = todo.count_documents({'status': 'progressing'})
    counts['Completed'] = todo.count_documents({'status': 'completed'})
    counts['Deleted'] = todo.count_documents({'delete': 'yes'})
    return counts


def get_counts():
    counts = {}
    counts['Total'] = 0
    counts['ToStudy'] = todo.count_documents({'type': 'study'})
    counts['Travelling'] = todo.count_documents({'type': 'travelling'})
    counts['Shopping'] = todo.count_documents({'type': 'shopping'})
    counts['Total'] = sum(counts.values())
    return counts


@socketio.on('connect')
def test_connect():
    print('CONNECT EVENT happened...')
    emit('success', {'data': 'Connected'})


@socketio.on('FetchRecords')
def fetch_all_records():
    data = []

    records = todo.find({'delete': {'$eq': 'no'}}, {
                        '_id': 0}).sort('item_id', -1)
    for i in records:
        data.append(i)

    records = todo.find({'delete': 'yes'}, {'_id': 0})
    for i in records:
        data.append(i)

    response = {'code': 200, 'records': data,
                'Counts': get_counts(), 'statusCounts': get_status_counts()}
    emit('sendingRecords', response, broadcast=True)


# ["AddRecord",{"value":"Paris","type":"travelling"}]
@socketio.on('AddRecord')
def add_record(data):
    # print('adding', data)
    cnt = todo.count_documents({})
    todo.insert_one(
        {'item_id': cnt+1, 'name': data['value'], 'type': data['type'], 'status': 'new', 'delete': 'no'})
    # socketio.emit('ChangeData')
    emit('ChangeData', broadcast=True)


@socketio.on('MarkAsComplete')
def mark_complete(data):
    # print('adding', data)
    # cnt = todo.find_one()
    todo.update_one({'item_id': data['item_id']}, {
                    '$set': {'status': 'completed'}})
    # {'item_id': cnt+1, 'name': data['value'], 'type': data['type'], 'status': 'new', 'delete': 'no'})
    emit('ChangeData', broadcast=True)


@socketio.on('MarkAsProgress')
def mark_progress(data):
    # print('adding', data)
    # cnt = todo.find_one()
    todo.update_one({'item_id': data['item_id']}, {
                    '$set': {'status': 'progressing'}})
    # {'item_id': cnt+1, 'name': data['value'], 'type': data['type'], 'status': 'new', 'delete': 'no'})
    emit('ChangeData', broadcast=True)


@socketio.on('MarkAsDelete')
def mark_delete(data):
    # print('adding', data)
    # cnt = todo.find_one()
    todo.update_one({'item_id': data['item_id']}, {'$set': {'delete': 'yes'}})
    # {'item_id': cnt+1, 'name': data['value'], 'type': data['type'], 'status': 'new', 'delete': 'no'})
    emit('ChangeData', broadcast=True)


if __name__ == '__main__':
    socketio.run(app)


@socketio.on('my broadcast event', namespace='/test')
def test_messages(message):
    emit('my response', {'data': message['data']}, broadcast=True)


@ socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')
