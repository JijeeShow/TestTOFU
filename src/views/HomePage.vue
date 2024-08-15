<template>
  <v-container>
    <div class="body">
      <div style="display: flex;height: 50px;">
        <router-link to="/create">
          <v-btn
            class="add"
            style="background-color: #0046f3; color: white; margin-right: 5px"
          >
            <v-icon>mdi-plus</v-icon>
            เพิ่มข้อมูล
          </v-btn>
        </router-link>
        <router-link to="/import">
          <v-btn
            class="edit"
            style="background-color: #ffc300; color: white; margin-right: 5px"
          >
            <v-icon>mdi-database-import</v-icon>
            นำเข้าข้อมูล
          </v-btn>
        </router-link>
        <v-btn
          class="add"
          style="background-color: #2ecc71; color: white"
          @click="downloadData"
        >
          <v-icon>mdi-download</v-icon>
          Download
        </v-btn>
      </div>
      <div class="table-wrapper">
        <v-data-table :headers="tableHeaders" :items="detail">
          
          <template v-slot:item="{ item }">
            <tr>
              <td
                v-for="(value, key) in item"
                :key="key"
                :style="{ backgroundColor: value ? '' : '#f0f0f0' }"
              >
                {{ value || "-" }}
              </td>
            </tr>
          </template>
          <template v-slot:empty>
            <v-alert type="warning">No data available</v-alert>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";

export default {
  name: "HomePage",
  methods: {
    async downloadData() {
      try {
        const response = await axios({
          url: "http://127.0.0.1:5000/download",
          method: "GET",
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading data:", error);
        alert("Error downloading data: " + error.message);
      }
    },
  },

  setup() {
    const data = ref([]);

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/getData");
        data.value = response.data;
      } catch (err) {
        alert("Error fetching data: " + err.message);
      }
    };

    fetchData();

    const filteredData = computed(() => {
      return data.value.filter((part) => part["Unnamed: 0"] === "Part No");
    });

    const detail = computed(() => {
      const partIndex = data.value.findIndex(
        (row) => row["Unnamed: 0"] === "Part No"
      );
      return partIndex !== -1 ? data.value.slice(partIndex + 1) : [];
    });

    const tableHeaders = computed(() => {
      return filteredData.value.length > 0
        ? Object.keys(filteredData.value[0]).map((key) => ({
            text: filteredData.value[0][key],
            value: key,
          }))
        : [];
    });
    console.log(filteredData);
    return {
      detail,
      tableHeaders,
    };
  },
};
</script>

<style scoped>
.body {
  display: grid;
  padding: 20px;

}

.add,
.edit {
  display: flex;
}
.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
  margin-top: 20px;
}
</style>
