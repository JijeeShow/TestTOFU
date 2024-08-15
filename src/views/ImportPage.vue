<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    "
  >
    <v-card style="width: 60%; padding: 10px">
      <form
        @submit.prevent="handleSubmit"
        style="
          display: grid;
          align-items: center;
          justify-content: center;
          padding: 10px;
        "
      >
      <p>Import ข้อมูล</p>
        <input type="file" required @change="handleFileChange" />
        <div style="margin-top: 10px">
          <router-link to="/">
            <v-btn
              style="
                background-color: #ccd1d1;
                color: white;
                width: 80px;
                margin-right: 5px;
              "
            >
              Back</v-btn
            >
          </router-link>

          <v-btn
            type="submit"
            style="background-color: #2ecc71; color: white; width: 80px"
            >Submit</v-btn
          >
        </div>
      </form>
    </v-card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "ImportPage",
  setup() {
    const filedata = ref(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        filedata.value = file;
      }
    };

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append("file", filedata.value);

        const response = await axios.post(
          "http://127.0.0.1:5000/import",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file: " + error.message);
      }
    };

    return {
      handleFileChange,
      handleSubmit,
    };
  },
};
</script>
