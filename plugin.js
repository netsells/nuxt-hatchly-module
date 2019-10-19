<% if (options.modules.snippets) { %>
import { register as registerSnippetsModule } from './hatchly/modules/snippets';
<% } %>
<% if (options.modules.navigation) { %>
import { register as registerNavigationModule } from './hatchly/modules/navigation';
<% } %>

export default async function(context) {
    <% if (options.modules.snippets) { %>
    await registerSnippetsModule(context);
    <% } %>

    <% if (options.modules.navigation) { %>
    await registerNavigationModule(context);
    <% } %>
};


