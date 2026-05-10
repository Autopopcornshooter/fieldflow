import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";

import { useEffect, useState } from "react";

import {
  getTodayTasks,
  createTodayTask,
  updateTaskStatus,
} from "../services/today-task.service";

import { TodayTask } from "../types/today-task";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TodayTask[]>([]);

  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [statusLoadingId, setStatusLoadingId] = useState<number | null>(null);

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
      if (!title.trim()) {
        Alert.alert("알림", "작업명을 입력해주세요.");

        return;
      }
      setLoading(true);
      await createTodayTask(title, location);

      setTitle("");
      setLocation("");

      await fetchTasks();
    } catch (error) {
      console.log(error);

      Alert.alert("에러", "작업 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id: number, status: string) => {
    try {
      setStatusLoadingId(id);

      await updateTaskStatus(id, status);

      await fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoadingId(null);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchTasks();

    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#999";

      case "in_progress":
        return "#2563eb";

      case "completed":
        return "#16a34a";

      case "issue":
        return "#dc2626";

      case "cancelled":
        return "#525252";

      default:
        return "#999";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "진행 전";

      case "in_progress":
        return "진행 중";

      case "completed":
        return "완료";

      case "issue":
        return "이슈 발생";

      case "cancelled":
        return "취소";

      default:
        return status;
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
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="작업명 입력"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="작업 위치 입력"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <Button
        title={loading ? "생성중..." : "작업 생성"}
        onPress={handleCreate}
        disabled={loading}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 14,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 6,
              }}
            >
              위치: {item.location || "-"}
            </Text>

            <View //status
              style={{
                marginTop: 8,
                alignSelf: "flex-start",
                backgroundColor: getStatusColor(item.status),
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {getStatusLabel(item.status)}
              </Text>
            </View>

            {item.status !== "completed" && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Button
                    title="진행중"
                    color="#2563eb"
                    disabled={statusLoadingId === item.id}
                    onPress={() => handleChangeStatus(item.id, "in_progress")}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Button
                    title="완료"
                    color="#16a34a"
                    disabled={statusLoadingId === item.id}
                    onPress={() => handleChangeStatus(item.id, "completed")}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Button
                    title="이슈"
                    color="#dc2626"
                    disabled={statusLoadingId === item.id}
                    onPress={() => handleChangeStatus(item.id, "issue")}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
