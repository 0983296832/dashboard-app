import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import saleServices from "@/api/sale";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useEffect, useState } from "react";
import AnswerRateChart from "./components/AnswerRateChart";
import FacilityLeadTable from "./components/FacilityLeadTable";
import SourceCallTable from "./components/SourceCallTable";

type FilterType = "all" | "month" | "quarter" | "year";

const PERIOD_LABEL: Record<string, string> = {
  week: "Tuần",
  month: "Tháng",
  quarter: "Quý",
  year: "Năm",
};

export default function SalePage() {
  const [period, setPeriod] = useState("month");
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const [leadSourceData, setLeadSourceData] = useState<any[]>([]);
  const [leadChartData, setLeadChartData] = useState<
    {
      source: string;
      leads: number;
      answered: number;
      answerRate: number;
    }[]
  >([]);
  const [stat, setStat] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([getLeadCallStatus(), getLeadDashboard()]);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const getLeadCallStatus = async () => {
    showLoading();
    try {
      const res: any = await saleServices.getLeadCallStatus({
        period_type: period,
        group_by: "co_so",
        answered_like: "nghe máy",
      });
      setLeadSourceData(res?.data);
      setLeadChartData(
        res?.data?.map((v: any) => ({
          source: v?.co_so,
          leads: v?.total,
          answered: v?.da_nghe_may?.count,
          answerRate: v?.da_nghe_may?.percent,
        })),
      );
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  const getLeadDashboard = async () => {
    showLoading();
    try {
      const res: any = await saleServices.getLeadDashboard({
        period_type: period,
        group_by: "co_so",
        date_column: "ngay_tao",
      });
      setStat(res?.data);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  useEffect(() => {
    getLeadCallStatus();
    getLeadDashboard();
  }, [period]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadScreen} />
        }
      >
        <View className="px-4 pt-4">
          {/* Filter */}
          <View className="flex-row gap-1.5 bg-gray-100 p-1 rounded-xl mb-3">
            {(["week", "month", "quarter", "year"] as FilterType[])?.map(
              (f) => (
                <Pressable
                  key={f}
                  onPress={() => setPeriod(f)}
                  className={`flex-1 py-1.5 rounded-lg items-center ${
                    period === f ? "bg-white " : ""
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      period === f ? "text-orange-500" : "text-gray-500"
                    }`}
                  >
                    {PERIOD_LABEL[f]}
                  </Text>
                </Pressable>
              ),
            )}
          </View>
          <FacilityLeadTable data={stat} />
          <AnswerRateChart data={leadChartData} />
          <SourceCallTable data={leadSourceData} />
        </View>
      </ScrollView>
    </View>
  );
}
