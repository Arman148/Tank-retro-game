function BinaryHeap(s){
 
   this.content = [];
 
   this.scoreFunction = s;
   return this;
};

BinaryHeap.prototype.push = function(elem) {
   this.content.push(elem);
   this.sinkDown(this.content.length - 1);
   return;
};

BinaryHeap.prototype.pop = function() {
   var result = this.content[0];
   var end = this.content.pop();
   if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
   }
   return result;
};

BinaryHeap.prototype.remove = function(n) {
   var isFound = this.content.some(function(c_n, idx) {
      if (cNode == node) {
         var end = this.content.pop();
         if (idx != this.content.length) {
            this.content[idx] = end;
            if (this.scoreFunction(end) < this.scoreFunction(n)) {
               this.sinkDown(idx);
            } else {
               this.bubbleUp(idx);
            }
         }
         return true;
      }
      return false;
   }, this);
   if (!isFound) {
   }
   return;
};

BinaryHeap.prototype.size = function() {
   return this.content.length;
};

BinaryHeap.prototype.sinkDown = function(idx) {
   var element = this.content[idx];
   while (idx > 0) {

      var parentIdx = Math.floor((idx + 1) / 2) - 1;
      var parent = this.content[parentIdx];
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
         this.content[parentIdx] = element;
         this.content[idx] = parent;

         idx = parentIdx;

      } else {

         break;
      }
   }
   return;
};

BinaryHeap.prototype.bubbleUp = function(idx) {
   
   var length = this.content.length;
   var element = this.content[idx];
   var elemScore = this.scoreFunction(element);

   while(true) {
      var child2Idx = (idx + 1) * 2;
      var child1Idx= child2Idx - 1;
      var swapIdx = null;

      if (child1Idx < length) {
         var child1 = this.content[child1Idx];
         var child1Score = this.scoreFunction(child1);
         if (child1Score < elemScore) {
            swapIdx = child1Idx;
         }
      }

      if (child2Idx < length) {
         var child2 = this.content[child2Idx];
         var child2Score = this.scoreFunction(child2);
         if (child2Score < (swapIdx === null ? elemScore : child1Score)) {
            swapIdx = child2Idx;
         }
      }


      if (swapIdx !== null) {
         this.content[idx] = this.content[swapIdx];
         this.content[swapIdx] = element;
         idx = swapIdx;

      } else {
         break;
      }
   }
   return;
};
