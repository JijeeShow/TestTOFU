<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <v-card style="display: flex; width: 50%;padding: 10px;">
      
      <form
        @submit.prevent="handleSubmit"
        style="
          display: grid;
          padding: 30px;
          justify-content: center;
          width: 100vh;
        "
      ><p>เพิ่มข้อมูล Part</p>
        <input
          type="text"
          placeholder="   Part name"
          required
          v-model="partName"
          style="height: 40px; width: 450px"
        />

        <div style="display: flex; justify-content: center; margin-top: 10px">
          <router-link to="/">
            <v-btn
              style="
                background-color: #ccd1d1;
                color: white;
                width: 80px;
                margin-right: 5px;
              "
              >Back</v-btn
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
  name: "CreatePage",
  setup() {
    const partName = ref("");

    const handleSubmit = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/createPart", {
          name: partName.value,
        });
        console.log("Response from server:", response.data);
        if (response.status === 200) {
          alert("เพิ่มข้อมูลใหม่แล้ว");
          location.reload();
        }
      } catch (err) {
        alert("Error fetching data: " + err.message);
      }

      console.log("Submitted Part Name:", partName.value);
    };

    return {
      partName,
      handleSubmit,
    };
  },
};
</script>
