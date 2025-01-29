### Full Speaker Text for Platform Engineering Session

#### **1. Introduction (2 minutes)**

"Let’s dive into a problem we all know too well. Developers waiting days, sometimes weeks, for environments to be provisioned. Teams are frustrated, DevOps is overwhelmed, and innovation slows down. But today, there’s a better way: platform engineering with GitOps."

"As Arik mentioned earlier, platform engineering helps us simplify complex processes, reducing friction for developers. And that’s exactly what we’ll see today."

"We’ll walk through how a developer can request an environment with just a GitHub issue. Then, using GitHub Actions, ArgoCD, and Crossplane, the magic happens. Environments are provisioned on Azure—automatically, securely, and reproducibly. Let’s see how."

---

#### **2. The Problem: Developer Needing an Environment (3 minutes)**

"Imagine this: a developer, let’s call her Sarah, has an urgent feature to test. She needs a dev environment. But the DevOps team is swamped. She’s stuck. Frustrated, she pings the team on Slack, sends a few emails, and then waits. Hours turn into days."

"Now, Sarah works in a company that’s adopted platform engineering. Instead of waiting, she simply opens a GitHub issue. This simple action eliminates the manual provisioning delays and DevOps bottleneck she used to face. Sarah’s company embraced **GitOps**, a strategy that manages infrastructure and applications using Git as the single source of truth. And that’s where our journey begins."

> **Demo Step**: Show the GitHub issue page where the developer requests the environment.

---

#### **3. Demo Walkthrough (15 minutes)**

"Let’s walk in Sarah’s shoes and see how her environment gets provisioned."

##### **Step 1: Developer Workflow**

"Sarah opens a GitHub issue, requesting a dev environment. Behind the scenes, a GitHub Action is triggered. This action generates the YAML configuration file needed for her environment. Instead of directly applying the file, it creates a **pull request (PR)**. The PR acts as a gate, preventing the accidental creation of unnecessary environments."

"This follows GitOps best practices—every infrastructure change is reviewed before being merged. This avoids developers spamming environment requests and ensures traceability and approval workflows. Let’s look at the PR that’s been created."

> **Demo Step**: Show the GitHub Actions page and highlight the workflow run triggered by the issue. Then, navigate to the pull request and show the YAML file created.

##### **Step 2: PR Review and Merge**

"The PR is reviewed and approved. Once it’s merged, ArgoCD detects the change automatically because it’s monitoring the specific directory in the `main` branch. From here, ArgoCD takes over and applies the changes. Crossplane interprets the YAML file and provisions the resources in Azure."

> **Demo Step**: Show the ArgoCD dashboard where the application is synced and Crossplane-managed resources are being provisioned.

##### **Step 3: Deployment with Crossplane**

"And just like that, Sarah’s environment is live. SQL databases, Kubernetes clusters, monitoring tools. Everything is set up and ready to go."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready.

---

#### **4. Architectural Insights and Benefits (7 minutes)**

"Let’s break down the architecture and the benefits of using GitOps, ArgoCD, and Crossplane."

"At the heart of this process is the **management cluster**, running both ArgoCD and Crossplane. ArgoCD monitors specific directories in the GitHub repository. When it detects changes, it applies them to the Kubernetes cluster. Crossplane, running within Kubernetes, manages Azure resources such as databases, Kubernetes clusters, and monitoring tools."

"One of the main benefits of using Crossplane is that it **treats infrastructure as Kubernetes resources**. Instead of managing cloud resources with external tools or scripts, we define them using **Custom Resources (CRs)** in Kubernetes. These CRs are defined through **Custom Resource Definitions (CRDs)**, which extend Kubernetes' API to allow native management of infrastructure."

"Since Crossplane runs as a **Kubernetes-managed resource**, we get automatic lifecycle management. It is declarative, continuously reconciling state. If a resource is accidentally modified manually, Crossplane will correct it and enforce the desired configuration. This removes the need for imperative scripting and manual interventions."

> **Demo Step**: Highlight the App of Apps pattern in the ArgoCD dashboard. Show how different layers of the architecture are managed modularly.

"We use the **App of Apps pattern** in ArgoCD for hierarchical deployments. This enables complex applications to be managed modularly while ensuring dependency synchronization. The repository structure is designed for modularity, including directories for `XRDs`, `Compositions`, and `Provider Configurations`. These components are automatically synced by ArgoCD to ensure consistent deployment."

"By using Crossplane alongside GitOps, we ensure **full reconciliation and drift correction** without needing additional tooling or external intervention."

---

#### **5. Understanding XRDs and Compositions (Level 300)**

"Now, let’s talk about **XRDs (Composite Resource Definitions)** and **Compositions**. These are fundamental concepts in Crossplane that help us create reusable, scalable infrastructure components."

"An **XRD** is a way to define a new type of infrastructure resource in Kubernetes. Instead of provisioning raw cloud resources, we can create an **abstracted** resource that encapsulates multiple components. For example, a `DevEnvironment` XRD can include a database, a Kubernetes namespace, and an Azure OpenAI instance—bundled into one requestable object."

"A **Composition** maps an XRD to actual resources. It allows us to define **how** an XRD should translate into real infrastructure. This means we can change our implementation details, like switching between SKUs or modifying policies, without affecting developers using the XRD."

"The benefit? **Abstraction, reusability, and consistency.** Developers don’t need to worry about underlying complexities. They simply request an environment, and Crossplane ensures they get a standardized, pre-approved setup."

> **Demo Step**: Show the `DevEnvironment` XRD and its Composition in the GitHub repository.

---

#### **6. Closing Thoughts (3 minutes)**

"Platform engineering with GitOps is about trust. Developers trust that environments are provisioned quickly and securely. DevOps trusts that automation is doing its job without cutting corners."

"Whether you’re scaling a startup or managing a large enterprise, GitOps with GitHub, ArgoCD, and Crossplane is a game-changer. Start small. Try automating one environment and watch the transformation."

"Remember Sarah? She’s now shipping features faster than ever, her team is happier, and her company is thriving. That’s the power of platform engineering."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready. Tie it back to Sarah’s success story.

---

### Key Reminders for Delivery
- Use the repository to demonstrate practical examples.
- Ensure transitions are smooth, using natural pauses to engage the audience.
- Highlight the GitHub Actions workflow, ArgoCD interface, and Crossplane resources in the demo.

