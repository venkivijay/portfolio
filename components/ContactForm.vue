<template>
  <form
    id="contact-form"
    name="leads"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    class="w-full"
    @submit.prevent="handleFormSubmit"
  >
    <input type="hidden" name="form-name" value="leads" />
    <label>
      <input
        id="username"
        v-model="form.name"
        type="text"
        name="name"
        :class="{ error: v$.name.$errors.length }"
        placeholder="Your Name"
      />
      <div
        v-for="error of v$.name.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <small class="error-msg">{{ error.$message }}</small>
        <br />
      </div>
    </label>
    <label>
      <input
        id="usermail"
        v-model="form.email"
        type="email"
        name="email"
        :class="{ error: v$.email.$errors.length }"
        placeholder="Email Address"
        novalidate
      />
      <div
        v-for="error of v$.email.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <small class="error-msg">{{ error.$message }}</small>
        <br />
      </div>
    </label>
    <label>
      <input
        id="mailsub"
        v-model="form.subject"
        type="text"
        name="subject"
        :class="{ error: v$.subject.$errors.length }"
        placeholder="Subject"
      />
      <div
        v-for="error of v$.subject.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <small class="error-msg">{{ error.$message }}</small>
        <br />
      </div>
    </label>
    <label>
      <textarea
        id="mailmes"
        v-model="form.message"
        type="text"
        name="message"
        :class="{ error: v$.message.$errors.length }"
        rows="5"
        placeholder="Message"
      />
      <div
        v-for="error of v$.message.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <small class="error-msg">{{ error.$message }}</small>
        <br />
      </div>
    </label>
    <button type="submit" class="my-4 c-button-primary">Send</button>
  </form>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const rules = {
  name: { required },
  email: { required, email },
  subject: { required },
  message: { required },
};

const v$ = ref(useVuelidate(rules, form));

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

async function handleFormSubmit() {
  const { $toast } = useNuxtApp();
  const isValidForm = await v$.value.$validate();
  if (!isValidForm) return;
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "leads",
      ...form.value,
    }),
  })
    .then(() => {
      $toast.success("Message sent!");
    })
    .catch((_error) =>
      // TODO: https://github.com/venkivijay/pf/projects/1#card-71654100
      // Custom component with socials inside toast
      $toast.error("Error sending message! Contact through socials")
    )
    .finally(() => {
      form.value = { name: "", email: "", subject: "", message: "" };
      v$.value.$reset();
    });
}
</script>
<style scoped>
input,
textarea {
  @apply block w-full p-3 my-4 rounded-md bg-surface outline-none border border-transparent focus:border-secondary;
}
.error-msg {
  @apply text-accent;
}
.error {
  @apply border-accent border;
}
@media (min-width: 768px) {
  form {
    grid-row: 1/3;
    grid-column: 2;
    padding-top: calc(var(--nav-height) + 0.5rem);
  }
}
</style>
