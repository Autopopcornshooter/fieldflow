import {
  View,
  Text,
  Button,
  FlatList,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  getTodayTasks,
  createTodayTask,
} from '../services/today-task.service';

import { TodayTask } from '../types/today-task';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TodayTask[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await getTodayTasks();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    try {
      await createTodayTask(
        '테스트 작업',
        'D45',
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: 50,
      }}
    >
      <Button
        title="작업 생성"
        onPress={handleCreate}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>{item.title}</Text>

            <Text>{item.status}</Text>

            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}