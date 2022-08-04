<template>
  <div class="section-extension-root">
    <!-- Extension Slot -->
    <fdk-extension :templates="templates" />
  </div>
</template>

<!-- #region  -->
<settings>
{
    "name": "section_extension",
    "label": "Extensions",
    "props": [
        {
          "type": "extension",
          "id": "extension",
          "label": "Extension Positions",
          "info": "Handle extension in these positions",
          "positions": [
            {
              "value": "section_extension",
              "text": ""
            }
          ],
          "default": {}
        }
    ]
}
</settings>
<!-- #endregion -->


<script>
export default {
  props: ["settings"],
  computed: {
    templates() {
      return this.settings.props?.extension?.value?.["section_extension"] || []
    }
  }
};
</script>

<style></style>
