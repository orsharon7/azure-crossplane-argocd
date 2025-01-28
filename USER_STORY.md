### Full Speaker Text for Platform Engineering Session

#### **1. Introduction (2 minutes)**

"Let’s dive into a problem we all know too well. Developers waiting days, sometimes weeks, for environments to be provisioned. Teams are frustrated, DevOps is overwhelmed, and innovation slows down. But today, there’s a better way: platform engineering with GitOps."

"As Arik mentioned earlier, platform engineering helps us simplify complex processes, reducing friction for developers. And that’s exactly what we’ll see today."

"We’ll walk through how a developer can request an environment with just a GitHub issue. Then, using GitHub Actions, ArgoCD, and Crossplane, the magic happens. Environments are provisioned on Azure—automatically, securely, and reproducibly. Let’s see how."

---

#### **2. The Problem: Developer Needing an Environment (3 minutes)**

"Consider this scenario: a developer named Sarah has an urgent feature to test. She requires a development environment equipped with Azure OpenAI, embedding capabilities, and a storage account for vectorization testing. However, the DevOps team is overwhelmed with tasks. Consequently, Sarah faces delays. She reaches out to the team via Teams and emails, but the waiting period extends from hours to days."

"Now, Sarah works in a company that’s adopted platform engineering. Instead of waiting, she simply opens a GitHub issue. This simple action eliminates the manual provisioning delays and DevOps bottleneck she used to face. Sarah’s company embraced **GitOps**, a strategy that manages infrastructure and applications using Git as the single source of truth. And that’s where our journey begins."

> **Demo Step**: Show the GitHub issue page where the developer requests the environment.

---

#### **3. Demo Walkthrough (15 minutes)**

"Let’s walk in Sarah’s shoes and see how her environment gets provisioned."

##### **Step 1: Developer Workflow**

"Sarah opens a GitHub issue, requesting a dev environment. Behind the scenes, a GitHub Action is triggered. This action generates the YAML configuration file needed for her environment. Let’s look at the PR that’s been created."

> **Demo Step**: Show the GitHub Actions page and highlight the workflow run triggered by the issue. Then, navigate to the pull request and show the YAML file created.

##### **Step 2: PR Review and Merge**

"The PR is reviewed and approved. Once it’s merged, ArgoCD detects the change automatically because it’s monitoring the specific directory in the `main` branch. From here, ArgoCD takes over and applies the changes. Crossplane interprets the YAML file and provisions the resources in Azure."

> **Demo Step**: Show the ArgoCD dashboard where the application is synced and Crossplane-managed resources are being provisioned.

##### **Step 3: Deployment with Crossplane**

"And just like that, Sarah’s environment is live. SQL databases, Kubernetes clusters, monitoring tools. Everything is set up and ready to go."

> **Demo Step**: Run the following command to verify the resources created by Crossplane:
> ```bash
> kubectl get managed
> ```
> Highlight these resources in the Azure portal.

---

#### **4. Architectural Insights and Benefits (7 minutes)**

"Let’s break down the architecture and the benefits of using GitOps, ArgoCD, and Crossplane."

"At the heart of this process is the **management cluster**, running both ArgoCD and Crossplane. ArgoCD monitors specific directories in the GitHub repository. When it detects changes, it applies them to the Kubernetes cluster. Crossplane, running within Kubernetes, manages Azure resources such as databases, Kubernetes clusters, and monitoring tools."

"This setup employs a multi-layered architecture to separate cluster management from workload deployment. Key components include **AKS Automatic** for managed Kubernetes capabilities, a management cluster for orchestrating workloads, and a GitOps workflow to automate application state reconciliation."

> **Demo Step**: Highlight the App of Apps pattern in the [ArgoCD dashboard.](https://172.188.212.150/) Show how different layers of the architecture are managed modularly.

"We use the **App of Apps pattern** in ArgoCD for hierarchical deployments. This enables complex applications to be managed modularly while ensuring dependency synchronization. The repository structure is designed for modularity, including directories for `XRDs`, `Compositions`, and `Provider Configurations`. These components are automatically synced by ArgoCD to ensure consistent deployment."

"For instance, by treating infrastructure components as managed Kubernetes resources, we leverage Kubernetes' reconciliation mechanisms to maintain the desired state, ensuring consistency and reliability."

---

#### **5. Closing Thoughts (3 minutes)**

"Platform engineering with GitOps is about trust. Developers trust that environments are provisioned quickly and securely. DevOps trusts that automation is doing its job without cutting corners."

"Whether you’re scaling a startup or managing a large enterprise, GitOps with GitHub, ArgoCD, and Crossplane is a game-changer. Start small. Try automating one environment and watch the transformation."

"Remember Sarah? She’s now shipping features faster than ever, her team is happier, and her company is thriving. That’s the power of platform engineering."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready. Tie it back to Sarah’s success story.

---

### Key Reminders for Delivery
- Use the repository to demonstrate practical examples.
- Ensure transitions are smooth, using natural pauses to engage the audience.
- Highlight the GitHub Actions workflow, ArgoCD interface, and Crossplane resources in the demo.

