# Steps to Code and Run Verilog Files

### 1. Install
- Install **Icarus Verilog** and **GTKWave** on your device.

---

### 2. Create Design File
- Create a `design.v` file in your code editor and write your design code.

---

### 3. Create Testbench File
- Create a `design_tb.v` file in the same directory and write your testbench code.

**Note:**  
Make sure you include `$dumpfile` and `$dumpvars` to create a `.vcd` file.

Example:
```verilog
initial begin
    $dumpfile("dump.vcd");
    $dumpvars;
end
```

---

### 4. Compile Design File
Command:  
```
iverilog design.v
```

---

### 5. Compile Testbench File
Command:  
```
iverilog design.v design_tb.v
```
(You will get an **a.out** file in the same directory)

---

### 6. Run the Simulation
Command:  
```
vvp a.out
```
(A `.vcd` file will be created in the same directory)

---

### 7. View Output in Waveform Window
How to see your output in the waveform window:

1. Command to run in terminal:  
   ```
   gtkwave <dumpfile>.vcd
   ```

2. You will get a waveform window where you can see your output in the form of a wave.
