# OneNote Summarize Tool for Azure Logic Apps

This tool generates summary pages per Section on OneNote for business trough the use of the automation with Azure Logic Apps.

> Logic Apps Setup is not included in this script, only the parsing and generation of the summary pages. Future versions will include ARM templates to automate the deployment.

## Requierements

Please setup an Application Settings with the `apikey` variable needed to access the application.

## Example CURL query

```bash
curl -X POST -d '{"body":"Oh yeah babay", "page":{"id":"XYZ01234"},"section":{"id": "SEC12345","parentSectionGroup":{"id":"SECGP45677"}, "parentNotebook":{"id":"NOTABCD"}}}' -H "Content-Type: application/json" "https://onenote-summarize.azurewebsites.net/pages?apikey=APIKEY"
```