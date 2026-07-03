---
layout: post
title: "Cracking the ML PUF"
date: 2026-07-03
---

## **Abstract** 

This blog is written to discuss the solution to a very interesting **Assignment** of course **CS771** offered in **2024-25 IInd Semester** where we were tasked to crack an **ML-PUF** using a linear model. Our complete approach along with the associated results are mentioned below. 

## **1 Problem 1.1 – Part 1: Deriving a Linear Model for ML-PUF** 

**Objective:** We aim to show how a single linear model can be used to predict the output of a MultiLevel Physically Unclonable Function (ML-PUF), which uses two arbiter PUFs and outputs the XOR of their responses. 

We are required to construct: 

- A mapping _ϕ_[˜] : _{_ 0 _,_ 1 _}_[8] _→_ R _D_[˜] that depends only on the input challenge _c_ (and possibly universal constants), and 

- A linear model ( ˜ **w** _,_[˜] _b_ ) _∈_ R _D_[˜] _×_ R that depends on PUF-specific parameters (e.g., delays), 

such that the ML-PUF response _r_ ( _c_ ) can be written as: 

**==> picture [125 x 24] intentionally omitted <==**

## **Step 1: Linear Model for Individual Time Delays** 

We need to show that the **Response0** and **Response1** can be linearly modelled for which we first need to prove that the individual time delays (upper & lower) for both **PUF-0** and **PUF-1** can be predicted by a linear model. 

The corresponding proof is given below: 

**==> picture [289 x 13] intentionally omitted <==**

**==> picture [288 x 13] intentionally omitted <==**

**==> picture [138 x 10] intentionally omitted <==**

we can safely set _t[u]_ 0[= 0][ and] _[ t][l]_ 0[= 0][.][(absorb initial delays into p1, q1, r1 and s1)] with continued observation, we obtain the following recurring pattern: 

**==> picture [284 x 32] intentionally omitted <==**

Preprint. Under review. 

where: 

**==> picture [130 x 76] intentionally omitted <==**

We can rewrite equation (1) as follows: 

**==> picture [291 x 11] intentionally omitted <==**

Summing the above equation over all values of i yields: 

**==> picture [337 x 30] intentionally omitted <==**

Expanding ∆ _i−_ 1 using equation (3), we obtain: 

**==> picture [369 x 31] intentionally omitted <==**

Assuming _t[u]_ 0[= 0][ and] _[ b]_[0][= 0][, the above equation can be expressed as:] 

**==> picture [346 x 77] intentionally omitted <==**

The equation above, as evident, takes the form _W[T] ϕ_ ( **z** ) + _b_ = _t[u]_ ( _z_ ),indicating that a linear model can predict the time for the upper signal to reach the finish line. Please note that: 

**==> picture [190 x 140] intentionally omitted <==**

The final equation: 

**==> picture [284 x 37] intentionally omitted <==**

demonstrates that the upper signal’s time to reach the finish line, _t[u]_ ( **z** ), can be predicted using a linear model with the aforementioned model parameters and feature vectors. 

2 

## **1.1 Step 2: Modelling the ML-PUF Output** 

We begin by modeling the signal delays in both upper and lower paths of two Arbiter PUFs using a shared feature vector _ϕ_ ( _z_ ), which depends only on the challenge _z_ . 

**==> picture [93 x 61] intentionally omitted <==**

The feature vector _ϕ_ ( _z_ ) is defined as: 

**==> picture [122 x 204] intentionally omitted <==**

Here it should be noted that: 

**==> picture [222 x 31] intentionally omitted <==**

Thus the final dimension of _ϕ_ ( _z_ ) will be 14 only, i.e., _ϕ ∈_ R[14] Define delay differences: 

**==> picture [300 x 28] intentionally omitted <==**

Augmenting feature and weight vectors: 

**==> picture [224 x 25] intentionally omitted <==**

Now, 

**==> picture [164 x 13] intentionally omitted <==**

3 

Thus, 

**==> picture [147 x 13] intentionally omitted <==**

Final response: 

**==> picture [163 x 30] intentionally omitted <==**

Define a lifted feature space: 

**==> picture [127 x 13] intentionally omitted <==**

with corresponding weight vector _W_[˜] such that: 

**==> picture [113 x 24] intentionally omitted <==**

This proves that the ML-PUF response can be linearly predicted in a transformed feature space. 

## **2 Problem 1.1 – Part 2: Dimensionality Required to Predict ML-PUF Responses** 

**Objective:** Determine the dimensionality _D_[˜] of the feature space required to predict the output of an ML-PUF using a single linear model. 

## **2.1 Step 1: Dimensionality of the Feature Map** 

The feature map _ϕ_ ( _x_ ) can be written as: 

**==> picture [122 x 216] intentionally omitted <==**

The dimensionality _D_ of the resulting feature space is determined by the number of distinct elements in the outer product _ϕ_[˜] ( _z_ ) _ϕ_[˜] _[T]_ ( _z_ ), where 

˜ _ϕ_ ( _z_ )˜ _ϕ[T]_ ( _z_ ) = [ _ϕ_ ( _z_ ) _,_ 1] _·_ [ _ϕ_ ( _z_ ) _,_ 1] _[T]_ 

Key observations: 

4 

- Firstly, the final **feature matrix** will be symmetric. Hence, can take only the upper or lower triangle of it as the simplified feature space. 

- There will be some other redundant terms as well which can be eliminated. 

Thus, finally, we can calculate the dimensionality of the feature space as: 

**D = (15*(15+1))/2 = 105** 

## **3 Problem 1.1 – Part 3: Using Kernel SVM Instead of Manual Feature Maps** 

**Objective:** To determine a suitable kernel function and its parameters for a kernel SVM that uses the original challenge vectors _c ∈{_ 0 _,_ 1 _}_[8] as input, and still achieves perfect classification for the ML-PUF problem. 

## **Step 1:Analysis** 

In previous parts, we constructed a feature map _ϕ_[˜] ( _c_ ) = _ϕ_ ( _c_ ) _⊗ ϕ_ ( _c_ ) to linearize the product of sign functions corresponding to two arbiter PUFs. This map effectively captures all **second order & higher order interactions** between elements of the transformed vector _ϕ_ ( _c_ ), which itself is a nonlinear function of _c_ . 

However, if we restrict ourselves to directly using the binary challenge _c ∈{_ 0 _,_ 1 _}_[8] as input, then we must rely on the kernel itself to implicitly compute higher-order feature interactions. 

## **Step 2: Choice of Kernel** 

To capture all quadratic interactions between the binary bits of the challenge vector _c_ , we choose the **polynomial kernel of degree 2** : 

**==> picture [126 x 13] intentionally omitted <==**

A polynomial kernel of degree 2 is the minimum requirement to capture XOR-like behavior in MLPUF modeling, because XOR involves second-order (quadratic) interactions between input features. Using a degree-2 kernel allows the SVM to represent these interactions directly, making it capable of learning the final response with high accuracy while avoiding unnecessary model complexity. Higher-degree kernels may work, but are computationally heavier and not necessary for XOR-like logic. 

This kernel expands to: 

**==> picture [205 x 13] intentionally omitted <==**

which includes: 

- All pairwise product terms _ci,m · ci,n_ (i.e., second-order monomials), 

- Linear terms _ci,m_ , and 

- A constant bias term. 

These terms allow the kernel SVM to operate in the same effective feature space as _ϕ_[˜] ( _c_ ), enabling it to model the XOR of two sign functions (i.e., the ML-PUF response). 

## **Step 3: Recommended Kernel and Parameters** 

- **Kernel type:** Polynomial kernel 

- **Degree:** 2 

- **coef0:** 1 (to include bias terms) 

- **gamma:** Default (can be set to 1 _/_ num_features = 1 _/_ 8) 

5 

## **Step 4: Conclusion** 

A kernel SVM using the polynomial kernel of degree 2: 

**==> picture [109 x 13] intentionally omitted <==**

is capable of perfectly classifying the ML-PUF responses when trained on the original 8-bit binary challenge vectors, without requiring any manual transformation or domain-specific feature maps. This is because the kernel implicitly computes the necessary second-order feature interactions required for linear separability in a higher-dimensional space. 

## **4 Problem 1.2 – Part 4: Individual Dealys from Linear Model Weights** 

**Objective:** Given a weight vector containing 64 weights we need to find the 256(64x4) delays associated with 64 stages of the Arbiter-PUF. 

## **Step1: Finding Relation between Individual Delays and Weights** 

Given a linear model representation of an Arbiter PUF: 

**==> picture [239 x 10] intentionally omitted <==**

where each _αi_ and _βi_ are defined in terms of delay variables as: 

**==> picture [201 x 20] intentionally omitted <==**

Our goal is to recover the 256 non-negative delay values: 

**==> picture [263 x 13] intentionally omitted <==**

that recreate the given model vector: 

**==> picture [135 x 13] intentionally omitted <==**

Define a sparse matrix _A ∈_ R[65] _[×]_[256] such that: 

**==> picture [32 x 8] intentionally omitted <==**

## **Step 2: Creating the Optimization Problem** 

We solve the following non-negative least squares problem: 

**==> picture [93 x 31] intentionally omitted <==**

This convex optimization problem yields a set of non-negative delay values consistent with the Arbiter PUF linear model. A system of equations Ax = b can be inverted in many ways 

- Solving the linear system _A_ **x** = **b** using a linear algebra solver, e.g., `numpy.linalg.solve` 

- Solving least squares min **x** _∥A_ **x** _−_ **b** _∥_ 2[2][, e.g.,] `[ sklearn.linear_model.LinearRegression]` 

- Solving ridge regression min **x** _λ∥_ **x** _∥_ 2[2][+] _[∥][A]_ **[x]** _[−]_ **[b]** _[∥]_[2] 2[, e.g.,] `[ sklearn.linear_model.Ridge]` 

- Custom hand-crafted solver 

6 

## **4.1 Solving the Optimization Problem** 

For this problem, we specifically designed a custom hand-crafted solver which used the **PGD algorithm** to find the solution of the above linear equation. The complete method has been described below: 

## **Problem Formulation** 

Given a weight vector **w** _∈_ R[65] , solve: 

**==> picture [154 x 16] intentionally omitted <==**

where **x** = [ **p** _[T] ,_ **q** _[T] ,_ **r** _[T] ,_ **s** _[T]_ ] _[T] ∈_ R[256] concatenates four delay vectors, and **A** _∈_ R[65] _[×]_[256] encodes the linear relationships: 

**==> picture [72 x 11] intentionally omitted <==**

## **Delay-Weight Mapping** 

- For _i_ = 0: 

**==> picture [104 x 21] intentionally omitted <==**

**==> picture [82 x 9] intentionally omitted <==**

**==> picture [222 x 21] intentionally omitted <==**

- For the bias ( _i_ = 64): 

**==> picture [112 x 20] intentionally omitted <==**

## **Projected Gradient Descent** 

Hyperparameters: learning rate _η_ = 10 _[−]_[2] , convergence tolerance _ϵ_ = 10 _[−]_[6] , maximum iterations max_iter = 1000. 

1. Initialize **x** 0 = **0** . 

2. Compute gradient: 

**==> picture [112 x 13] intentionally omitted <==**

3. Update with projection: 

**==> picture [138 x 13] intentionally omitted <==**

where _η_ is the _step size_ (learning rate). 

4. Stop when 

**==> picture [80 x 11] intentionally omitted <==**

where _ϵ_ is the _convergence tolerance_ , or when _k_ = max_iter. 

## **Matrix Structure** 

The matrix _A_ encodes the linear relationship between the delay vectors **p** _,_ **q** _,_ **r** _,_ **s** and the weight vector **w** . Each row _Ai_ corresponds to _wi_ as follows: 

**==> picture [92 x 50] intentionally omitted <==**

7 

## **Row Definitions** 

1. **Row** _A_ 0 **(for** _w_ 0 **)** : 

**==> picture [390 x 349] intentionally omitted <==**

## **5 Problem 1.1 – Part 7: Comparison of Different Linear Classifiers** 

**Objective:** To evaluate different linear classifier performance with different sets of hyperparameters.In this experiment, we evaluated three linear classification methods—LinearSVC, LogisticRegression„ and RidgeClassifier—to solve Problem 1.1. 

## **Step 1: Hyperparameters Studied** 

We systematically varied the following hyperparameters: 

- **Loss Function (LinearSVC)** : `hinge` vs `squared_hinge` 

- **Regularization Strength (** `C` **)** : 

   - Low: `0.01` 

   - Medium: `0.1` 

   - High: `10` 

- **Tolerance for Convergence (** `tol` **)** : 

   - High: `1e1` 

   - Medium: `1e-1` 

   - Low: `1e-3` 

- **Penalty Type** : `l1` vs `l2` (where supported) 

For Logistic Regression with `l2` and `l1` penalty, we used the **saga** solver. 

8 

## **5.1 Step 2: Comparing Linear SVC v/s Logistic Regression** 

## **5.1.1 For C=0.01 and l2 penalty and ’hinge’ loss** 

|0_._7<br>0_._8<br>0_._9<br>1|1e-3<br>1e-1<br>1e1<br>Accuracy vs Tolerance<br>LinearSVC<br>LogisticRegression|Figure 1: Linear SVC|Figure 1: Linear SVC|Figure 1: Linear SVC|
|---|---|---|---|---|
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|0.9990<br>0.9006<br>0.9168|0.2233<br>0.2186<br>0.2108|
|||Figure 2: Logistic Regression|||
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|1.4879<br>1.1453<br>0.8757|0.2421<br>0.3348<br>0.2091|
||LinearSVC<br>LogisticRegression||||
||||||



Figure 3: Accuracy vs Tolerance and corresponding values 

## **5.1.2 For C=0.1 and l2 penalty and ’hinge’ loss** 

**==> picture [416 x 152] intentionally omitted <==**

**----- Start of picture text -----**<br>
Accuracy vs Tolerance<br>1 Figure 4: Linear SVC<br>Tolerance Train Time(s) Map Time(s)<br>0 . 95 1 e [−] [3] 1.1367 0.2487<br>1 e [−] [1] 0.9884 0.2414<br>0 . 9 1 e [1] 0.8952 0.2206<br>0 . 85 Figure 5: Logistic Regression<br>Tolerance Train Time(s) Map Time(s)<br>1 e [−] [3] 1.2876 0.2370<br>0 . 8<br>1e-3 1e-1 1e1 1 e [−] [1] 1.0605 0.2957<br>1 e [1] 1.1181 0.2207<br>LinearSVC LogisticRegression<br>**----- End of picture text -----**<br>


Figure 6: Accuracy vs Tolerance and corresponding values 

## **5.1.3 For C=10 and l2 penalty and ’hinge’ loss** 

|0_._8<br>0_._85<br>0_._9<br>0_._95<br>1|1e-3<br>1e-1<br>1e1<br>Accuracy vs Tolerance<br>LinearSVC<br>LogisticRegression|Figure 7: Linear SVC|Figure 7: Linear SVC|Figure 7: Linear SVC|
|---|---|---|---|---|
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|1.8284<br>**1.2835**<br>0.9588|0.2845<br>**0.2520**<br>0.2252|
|||Figure 8: Logistic Regression|||
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|**3.7004**<br>1.1008<br>0.8670|**0.2359**<br>0.2588<br>0.2084|
||LinearSVC<br>LogisticRegression||||
||||||



Figure 9: Accuracy vs Tolerance and corresponding values 

9 

## **5.1.4 For C=0.01 and** _L_ 1 **penalty and ’squared_hinge’ loss** 

|0_._6<br>0_._7<br>0_._8<br>0_._9<br>1|1e-3<br>1e-1<br>1e1<br>Accuracy vs Tolerance<br>LinearSVC<br>LogisticRegression|Figure 10: Linear SVC|Figure 10: Linear SVC|Figure 10: Linear SVC|
|---|---|---|---|---|
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|1.3823<br>0.9232<br>1.0871|0.2900<br>0.2238<br>0.2475|
|||Figure 11: Logistic Regression|||
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|1.1364<br>1.2825<br>1.0746|0.2382<br>0.3266<br>0.2170|
||LinearSVC<br>LogisticRegression||||
||||||



Figure 12: Accuracy vs Tolerance and corresponding values 

## **5.1.5 For C=0.1 and** _L_ 1 **penalty and ’squared_hinge’ loss** 

|0_._7<br>0_._8<br>0_._9<br>1|1e-3<br>1e-1<br>1e1<br>Accuracy vs Tolerance<br>LinearSVC<br>LogisticRegression|Figure 13: Linear SVC|Figure 13: Linear SVC|Figure 13: Linear SVC|
|---|---|---|---|---|
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|5.6956<br>1.2255<br>0.9425|0.2694<br>0.3309<br>0.2063|
|||Figure 14: Logistic Regression|||
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|2.0561<br>1.3647<br>1.4318|0.2157<br>0.2862<br>0.2720|
||LinearSVC<br>LogisticRegression||||
||||||



Figure 15: Accuracy vs Tolerance and corresponding values 

## **5.1.6 For C=10 and** _L_ 1 **penalty and ’squared_hinge’ loss** 

|0_._7<br>0_._8<br>0_._9<br>1|1e-3<br>1e-1<br>1e1<br>Accuracy vs Tolerance<br>LinearSVC<br>LogisticRegression|Figure 16: Linear SVC|Figure 16: Linear SVC|Figure 16: Linear SVC|
|---|---|---|---|---|
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|7.3746<br>1.1274<br>1.0674|0.2509<br>0.2260<br>0.2475|
|||Figure 17: Logistic Regression|||
|||Tolerance|Train Time(s)|MapTime(s)|
|||1_e−_3<br>1_e−_1<br>1_e_1|6.5858<br>1.1530<br>0.9084|0.2184<br>0.2494<br>0.2214|
||LinearSVC<br>LogisticRegression||||
||||||



Figure 18: Accuracy vs Tolerance and corresponding values 

10 

## **5.2 Step 3: Evaluation on Ridge Regression** 

We also evaluated the dataset using Ridge Regression, varying different _α_ and tolerance = 0.01, as varying the tolerance did not improve the accuracy, even though low tolerance yielded lower train and map time. 

Table 1: RidgeClassifier results 

|_α_|**Accuracy**|**Train Time**|**Map Time**|
|---|---|---|---|
|1<br>10<br>100<br>1000<br>10000|0.8479<br>**0.8668**<br>0.8500<br>0.7268<br>0.6850|0.6088<br>**0.5369**<br>0.4888<br>0.4796<br>0.5652|0.2278<br>**0.2259**<br>0.2174<br>0.2093<br>0.2460|



RidgeClassifier shows moderate accuracy (86.68% ), and its performance declines with increasing alpha, indicating sensitivity to over-regularization. 

## **5.3 Step 4: Best parameters for Models** 

From the observation made, we have tabulated the best parameters for each model that achieve the best accuracy in the least training time possible. 

Table 2: Classifier Performance Comparison 

|**Classifer**|**Accuracy**|**Train Time (s)**|**Map Time (s)**|**Model Size**|**Best Param**|
|---|---|---|---|---|---|
|RidgeClassifer<br>LogisticRegression<br>LinearSVC|0.8668<br>1<br>1|0.5369<br>3.7004<br>1.2835|0.2259<br>0.2359<br>0.2520|105<br>105<br>105|_α_= 10, tol=10_−_4<br>C=10, penalty=L2,tol=10_−_3<br>C=10, penalty=L2,tol=10_−_1|



## **5.4 Conclusion** 

Logistic regression and LinearSVC achieve perfect accuracy (1.0). However, when considering additional performance metrics such as training time and inference (mapping) time, LinearSVC emerges as the most efficient model. It also generally performs better than Logistic Regression over various hyperparameters. 

Our best model is **LinearSVC** with the hyperparameters: _C_ = 10 **,** `penalty` **= L2, and** `tol` = 10 _[−]_[1] . It achieves a perfect **accuracy of 1.0** with the lowest training time of **1.2835 seconds** among all models with perfect accuracy, making it the most optimal choice in terms of both performance and computational efficiency. 

