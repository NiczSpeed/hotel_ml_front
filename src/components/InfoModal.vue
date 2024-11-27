<template>
  <div class="modal fade" id="infoModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="infoModalLabel">{{ modalTitle }}</h1>
        </div>
        <div class="modal-body">
          {{ modalMessage }}
        </div>
        <div class="modal-footer">
          <button v-if="modalTitle.includes('Success')" class="btn btn-outline-success"
            data-bs-dismiss="modal">OK</button>
          <button v-if="modalTitle.includes('Error')" class="btn btn-outline-danger" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
export default {

  name: "InfoModal",
  data() {
    return {
      modal: null,
      modalTitle: "",
      modalMessage: "",
    };
  },
  mounted() {
    const modalElement = document.getElementById("infoModal");
    this.modal = new Modal(modalElement);
  },
  methods: {
    showModal(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.modal.show();
    },
  }
}

</script>

<style></style>