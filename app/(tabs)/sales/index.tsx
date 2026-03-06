import { ScrollView, View } from "react-native";

import AnswerRateChart from "./components/AnswerRateChart";
import FacilityLeadTable from "./components/FacilityLeadTable";
import SourceCallTable from "./components/SourceCallTable";

export default function SalePage() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-4">
          <FacilityLeadTable />
          <AnswerRateChart />
          <SourceCallTable />
        </View>
      </ScrollView>
    </View>
  );
}
