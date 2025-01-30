### Full Speaker Text for Platform Engineering Session

#### **1. Introduction (2 minutes)**

"Let’s dive into a problem we all know too well. Developers waiting days, sometimes weeks, for environments to be provisioned. Teams are frustrated, DevOps is overwhelmed, and innovation slows down. But today, there’s a better way: platform engineering with GitOps."

"As Arik mentioned earlier, platform engineering helps us simplify complex processes, reducing friction for developers. And that’s exactly what we’ll see today."

"We’ll walk through how a developer can request an environment with just a GitHub issue. Then, using GitHub Actions, ArgoCD, and Crossplane, the infrastructure is provisioned on Azure—automatically, securely, and reproducibly. Let’s break it down."

---

#### **2. The Problem: Developer Needing an Environment (3 minutes)**

"Imagine this: a developer, has an urgent feature to test. They needs a dev environment. But the DevOps team is swamped. They are stuck. Frustrated, they pings the team, sends a few emails, and then waits. Hours turn into days."

"Now, the developer works in a company that’s adopted platform engineering. Instead of waiting, they simply open a GitHub issue. This action eliminates manual provisioning delays and removes the DevOps bottleneck. Their company embraces **GitOps**, managing infrastructure and applications through Git as the single source of truth. And that’s where our journey begins."

> **Demo Step**: Show the GitHub issue page where the developer requests the environment.

---

#### **3. Demo Walkthrough (15 minutes)**

##### **Step 1: Developer Workflow**

"The developer opens a GitHub issue requesting a dev environment. Behind the scenes, a GitHub Action is triggered. It generates a YAML configuration file that defines the infrastructure requirements."

"Instead of directly applying the file, it creates a **pull request (PR)**. This PR acts as a gate, preventing unnecessary environments from being created accidentally. It enforces an approval workflow before any infrastructure is provisioned. This is a core GitOps best practice—every infrastructure change is reviewed, versioned, and approved before being merged."

> **Demo Step**: Show the GitHub Actions page and highlight the workflow run triggered by the issue. Then, navigate to the pull request and show the YAML file created.

##### **Step 2: PR Review and Merge**

"The PR is reviewed and approved. Once merged, ArgoCD detects the change automatically, since it continuously monitors the `main` branch for updates. ArgoCD then applies the changes, and Crossplane provisions the required resources in Azure."

> **Demo Step**: Show the [ArgoCD dashboard](https://172.188.212.150/) where the application is synced and Crossplane-managed resources are being provisioned.

##### **Step 3: Deployment with Crossplane**

"The developer's environment is fully provisioned through an automated pipeline: the AKS cluster is operational, the Azure OpenAI instance with the embedding model is deployed, and the storage account has been configured with the necessary policies. They can immediately begin their vectorization project with all required resources in place."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready.

"Before we explore the provisioned resources, let’s dive into the architecture."

---

#### **4. Architectural Insights and Benefits (7 minutes)**

### Full Speaker Text for Platform Engineering Session

#### **4. Architectural Insights and Benefits (7 minutes)**

"Let’s break down the architecture and the benefits of using GitOps, ArgoCD, and Crossplane."

"At the heart of this process is the **management cluster**, which orchestrates both infrastructure and workloads. It consists of three key components, each playing a critical role."

#### **1. ArgoCD – The GitOps Controller**
"First, we have **ArgoCD**, our GitOps controller. It continuously monitors designated directories in our GitHub repository. When a change is detected, ArgoCD ensures the declared state in Git is applied to the cluster."

"This provides **automated synchronization**, prevents drift, and enforces consistency without manual intervention."

#### **2. Crossplane – Kubernetes-Native Cloud Resource Management**
"Next, we have **Crossplane**, running inside Kubernetes. It extends Kubernetes capabilities by allowing us to manage cloud resources as **native Kubernetes objects**."

"Instead of using CLI commands or scripts to interact with Azure, we define infrastructure declaratively through **Custom Resources (CRs)**. This makes provisioning **reproducible**, **auditable**, and **version-controlled**, ensuring infrastructure is managed just like application code."

#### **3. Kubernetes API & Custom Resource Definitions (CRDs)**
"Finally, we have **CRDs (Custom Resource Definitions)**, which extend Kubernetes by introducing new resource types."

"With Crossplane, every cloud resource—such as an **AKS cluster, an Azure SQL database, or a storage account**—is represented as a **Managed Resource** in Kubernetes."

"This means we can interact with infrastructure using **standard Kubernetes commands**, like:"
```bash
kubectl create -f database.yaml
kubectl describe managed azure.database.sqlserver
```

#### **Automated State Management with Crossplane**
"Crossplane also acts as a **Kubernetes Controller**, continuously watching external cloud resources."

"If a resource is modified or deleted **outside of Kubernetes**, Crossplane detects the change and **restores the declared state**, ensuring that infrastructure remains consistent with Git."

"This is a critical feature for enforcing security, preventing configuration drift, and maintaining **reliability**."

---

### **Managing Resources as ArgoCD Applications**
"Additionally, in our architecture, all resources provisioned by Crossplane are **managed as ArgoCD applications**."

"This ensures full **version control, synchronization, and auditability**, so every infrastructure change is tracked, approved, and applied in a structured way."

> **Demo Step**: Highlight the **App of Apps** pattern in the ArgoCD dashboard. Show how different layers of the architecture are modularly managed.

---

### **The App of Apps Pattern**
"We use the **App of Apps pattern** in ArgoCD for hierarchical deployments."

"This approach allows complex applications to be **modular**, breaking them into smaller, manageable components while ensuring dependencies remain in sync."

"The repository structure reflects this modular approach, with dedicated directories for **XRDs, Compositions, and Provider Configurations**."

"Since everything is managed declaratively, changes to infrastructure or configurations are **automatically detected and applied**, keeping environments up to date with minimal operational effort."

---

### **Bringing it All Together**
"By integrating Crossplane with GitOps, we achieve:"
- **Automated state enforcement**, ensuring infrastructure always matches its declared configuration.
- **Version control for infrastructure**, making all changes trackable and auditable.
- **Robust drift correction**, preventing manual changes from affecting stability.
- **A unified workflow**, where developers and platform teams operate within the same ecosystem."

"This is the power of **platform engineering with GitOps**—a fully automated, scalable, and developer-friendly way to manage cloud environments."




---

#### **5. Understanding XRDs and Compositions (Level 300)**

"Now, let’s talk about **XRDs (Composite Resource Definitions)** and **Compositions**. These are core components in Crossplane that allow us to create scalable, reusable infrastructure configurations."

"An **XRD** defines a new composite resource in Kubernetes. Instead of provisioning low-level cloud components separately, we create an abstraction that combines multiple services. For example, our `DevEnvironment` XRD includes an AKS cluster, an Azure OpenAI instance, and a storage account, bundled as a single resource definition."

"A **Composition** maps an XRD to its underlying infrastructure. It defines **how** a composite resource translates into actual cloud components. This means we can modify resource settings—such as VM sizes or database SKUs—without affecting the interface used by developers."

"The benefits are clear: **abstraction, standardization, and reusability**. Developers don’t need to worry about infrastructure details; they simply request an environment, and Crossplane ensures a standardized, policy-compliant setup."

> **Demo Step**: Show the `DevEnvironment` XRD and its Composition in the GitHub repository.

---

#### **6. Closing Thoughts (3 minutes)**

"We’ve now seen how a developer can request infrastructure through GitHub, how GitOps enforces a structured workflow, and how ArgoCD and Crossplane integrate to manage infrastructure in a Kubernetes-native way."

"This process ensures consistency, security, and scalability. We’ve gone from an infrastructure request to a fully provisioned environment with just a few Git operations—without any manual steps."

"And this is just the beginning. This pipeline can be extended to deploy the developer’s application as well. The same workflow could be enhanced to pull application configurations from Git, ensuring that both infrastructure and workloads are deployed in a unified, declarative manner."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready. Tie it back to the developer’s experience.

